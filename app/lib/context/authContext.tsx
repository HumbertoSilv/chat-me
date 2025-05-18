'use client'

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { createAccessToken } from '../actions/accessToken'
import { auth } from '../firebase/config'
import { deleteAccessToken, setAccessToken } from '../utils/cookies'


interface AuthContextType {
  authUser: User | null
  loading: boolean
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<User>
  signInWithGoogle: () => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    // refactor this
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setAuthUser(user)
      setLoading(false)

      if (user) {
        const FireBaseIDToken = await user.getIdToken()
        if (FireBaseIDToken) {
          const access_token = await createAccessToken(FireBaseIDToken)
          await setAccessToken(access_token)
        }

      } else {
        await deleteAccessToken()
      }
    })

    return () => unsubscribe()
  }, [])

  const value = {
    authUser,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)