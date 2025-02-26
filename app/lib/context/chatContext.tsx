'use client';

import React, { createContext, useContext, useState } from 'react';

export type IChat = {
  chatId: string
  chatType: string
  users: [
    {
      username: string
      email: string
      name?: string
      avatar_url?: string
    }
  ]
}

type ChatsContextType = {
  chats: IChat[]
  setChats: (data: IChat[]) => void;
  getChatByUsername: (username: string) => IChat | undefined;
}

const ChatsContext = createContext<ChatsContextType>({} as ChatsContextType);

export const ChatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChatsState] = useState<IChat[]>([])

  const setChats = (data: IChat[]) => {
    setChatsState(data)
  }

  const getChatByUsername = (username: string) => {
    return chats.find((chat) => chat.users.some((user) => user.username === username))
  }

  return (
    <ChatsContext.Provider value={{ chats, setChats, getChatByUsername }}>
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => useContext(ChatsContext)
