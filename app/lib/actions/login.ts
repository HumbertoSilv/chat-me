'use server'

import { redirect } from "next/navigation";
import { login } from "../apis/api";

export const actionLogin = async (_prevState: null, formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  // TODO: validate infos
  // TODO: add try catch

  await login({ username, password })

  redirect('/chat')
}
