'use server'

import { cookies } from "next/headers"

export const getAccessToken = async (): Promise<string> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  return accessToken?.value as unknown as string
}

export const setAccessToken = async (access_token: string): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'access_token',
    value: access_token,
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true
  })
}

export const deleteAccessToken = async (): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
}