'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { isAuthenticated } from '../utils/auth';

type Message = {
  userId: string
  chatId: string
  content: string
  timestamp: string
}

type WebSocketContextType = {
  messages: Message[]
  connectWebsocket: () => void
  sendMessage: ({ userId, chatId, content }: { userId: string, chatId?: string, content: string }) => void
  setIsLoggedIn: (isLogged: boolean) => void
}

const WebSocketContext = createContext<WebSocketContextType>({} as WebSocketContextType)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [authenticated, setAuthenticated] = useState<boolean>(false)

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

  const setIsLoggedIn = (isLogged: boolean) => {
    setAuthenticated(isLogged)
  }

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) connectWebsocket()
    })


    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [authenticated])


  return (
    <WebSocketContext.Provider value={{ connectWebsocket, sendMessage, setIsLoggedIn, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext)
