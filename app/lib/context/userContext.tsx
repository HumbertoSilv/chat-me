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
  isLoggedIn: boolean
  user: IUser
  setUser: (data: IUserPublic) => void
}


const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUserState] = useState<IUser>({
    userId: '',
    username: '',
    email: '',
  })

  const setUser = async (data: IUserPublic) => {
    const token = await getAccessToken()
    const decoded = jwt.decode(token) as JWT

    setUserState({ ...data, userId: decoded.sub })
    setIsLoggedIn(true)
  }

  return (
    <UserContext.Provider value={{ setUser, user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)
