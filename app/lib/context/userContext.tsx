'use client';
import jwt from 'jsonwebtoken';

import React, { createContext, useContext, useState } from 'react';
import { getAccessToken } from '../utils/cookies';


interface IUser {
  userId: string
  username: string
  email: string
  name?: string
  avatar_url?: string
}

type JWT = {
  sub: string
  exp: number
}

type IUserPublic = Omit<IUser, 'userId'>

type UserContextType = {
  setUser: (data: IUserPublic) => void
  user: IUser
}


const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<IUser>({
    userId: '',
    username: '',
    email: '',
  })

  const setUser = async (data: IUserPublic) => {
    const token = await getAccessToken()
    const decoded = jwt.decode(token) as JWT

    setUserState({ ...data, userId: decoded.sub })
  }

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)
