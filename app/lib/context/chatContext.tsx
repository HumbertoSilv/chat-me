'use client';

import React, { createContext, useContext, useState } from 'react';
import { IUserPublic } from './userContext';

interface IMessage {
  id: string
  content: string
  createdAt: string
  updatedAt?: string
}

export type IChat = {
  chatId: string
  chatType: string
  users: IUserPublic[]
  lastMessage: IMessage
}

export type ICurrentChat = Omit<IChat, 'lastMessage'>

type ChatsContextType = {
  chats: IChat[]
  setChats: (data: IChat[]) => void;
  currentChat: ICurrentChat | null;
  getChatByUsername: (username: string) => IChat | undefined;
  setCurrentChat: (chat: ICurrentChat) => void;
}

const ChatsContext = createContext<ChatsContextType>({} as ChatsContextType);

export const ChatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChatsState] = useState<IChat[]>([])
  const [currentChat, setCurrentChatState] = useState<ICurrentChat | null>(null)

  const setChats = (data: IChat[]) => {
    setChatsState(data)
  }

  const setCurrentChat = (chat: ICurrentChat) => {
    setCurrentChatState(chat)
  }

  const getChatByUsername = (username: string) => {
    return chats.find((chat) => chat.users.some((user) => user.username === username))
  }

  return (
    <ChatsContext.Provider value={{ chats, setChats, getChatByUsername, currentChat, setCurrentChat }}>
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => useContext(ChatsContext)
