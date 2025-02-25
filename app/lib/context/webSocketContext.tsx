'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type Message = {
  userId: string
  chatId: string
  content: string
  timestamp: string
}

type WebSocketContextType = {
  connectWebsocket: () => void
  sendMessage: ({ userId, chatId, content }: { userId: string, chatId?: string, content: string }) => void
  messages: Message[]
}

const WebSocketContext = createContext<WebSocketContextType>({} as WebSocketContextType)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const connectWebsocket = () => {
    if (ws.current) {
      ws.current.close() // Fecha conexão anterior, se existir
    }

    ws.current = new WebSocket("ws://localhost:8000/ws/", []) // TODO: set in ENV

    ws.current.onopen = () => console.log("Connected")
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)

      const newMessage: Message = {
        userId: data.user_id,
        chatId: data.chat_id,
        content: data.content,
        timestamp: data.timestamp || new Date().toISOString(),
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }
    ws.current.onclose = () => console.log("Disconnected")
  }

  const sendMessage = ({ userId, chatId, content }: { userId: string, chatId?: string, content: string }) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        content,
        user_id: userId,
        chat_id: chatId,
        type: "new_message"
      }

      ws.current.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  // Limpa a conexão ao desmontar o provider
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close()
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ connectWebsocket, sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext)
