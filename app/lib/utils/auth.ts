'use server'

import { cookies } from "next/headers"

export const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  return Boolean(accessToken?.value)
}
