import { cookies } from "next/headers";


interface ILogin {
  username: string
  password: string
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
