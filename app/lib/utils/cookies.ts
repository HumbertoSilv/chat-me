'use server'

import { cookies } from "next/headers"

export const getAccessToken = async (): Promise<string> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  return accessToken?.value as unknown as string
}
