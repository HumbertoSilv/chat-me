import { cookies } from "next/headers";
import { IUserPublic } from "../context/userContext";

interface IMessage {
  id: string
  content: string
  created_at: string
  updated_at?: string
}

interface IChatsResponse {
  id: string
  chat_type: string
  users: IUserPublic[]
  last_message: IMessage
}

interface ProfileResponse {
  username: string
  email: string
  name?: string
  avatar_url?: string
}

interface AccessTokenResponse {
  access_token: string
  token_type: string
}


export async function createAccessTokenReq(IDToken: string): Promise<AccessTokenResponse> {
  try {
    const response = await fetch(
      'http://localhost:8000/auth/create-access-token', // TODO: set URL in ENV
      {
        method: 'POST',
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: IDToken }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao criar access token: ${response.status}`);
    }

    const token = await response.json()
    return token

  } catch (error) {
    throw error
  }
}

export async function getUserProfileReq(): Promise<ProfileResponse> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  const response = await fetch(
    'http://localhost:8000/users/profile', // TODO: set URL in ENV
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken?.value}`,
        'Accept': 'application/json',
      },
    }
  )

  const userInfos = await response.json()

  return userInfos
}

export async function searchUsersReq(username?: string): Promise<ProfileResponse[]> {
  const searchParams = new URLSearchParams()
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  if (username) {
    searchParams.append('username', username)
  }

  const response = await fetch(
    `http://localhost:8000/users/search?${searchParams.toString()}`,  // TODO: set URL in ENV
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken?.value}`,
        'Accept': 'application/json',
      },
    }
  )
  const userInfos = await response.json()
  return userInfos
}

export async function getDirectChatsReq(): Promise<IChatsResponse[]> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  const response = await fetch(
    'http://localhost:8000/chats/direct',
    {
      headers: {
        'Authorization': `Bearer ${accessToken?.value}`,
        'Accept': 'application/json',
      },
      // credentials: 'same-origin',
    })

  const chats = await response.json()

  return chats
}