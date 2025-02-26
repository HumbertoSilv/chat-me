import { cookies } from "next/headers";


interface ILogin {
  username: string
  password: string
}

interface IChatsResponse {
  id: string
  chat_type: string
  users: [
    {
      username: string
      email: string
      name?: string
      avatar_url?: string
    }
  ],
  messages: []
}

interface ProfileResponse {
  username: string
  email: string
  name?: string
  avatar_url?: string
}


export async function login({ username, password }: ILogin): Promise<void> {
  const formData = new URLSearchParams()
  formData.append("username", username)
  formData.append("password", password)

  const response = await fetch(
    'http://localhost:8000/auth/login', // TODO: set URL in ENV
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

  const token = await response.json()
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'access_token',
    value: token.access_token,
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true
  })
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