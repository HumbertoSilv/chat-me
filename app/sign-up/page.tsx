'use client'

import * as Input from "@/app/ui/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "../lib/context/authContext"

export default function SignUp() {
  const router = useRouter()
  const { signUpWithEmail } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: add ZOD for validation
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    try {
      await signUpWithEmail(email, password)
      router.push('/chat')

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Ocorreu um erro ao criar sua conta')
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col max-w-[450px] m-auto mt-18">
        <h1 className="text-6xl font-medium py-8 text-white mb-8">
          Crie sua conta.
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <label
          htmlFor="email"
          className="flex flex-col font-normal text-gray-200 mb-4"
        >
          Seu email
          <Input.Root className="bg-zinc-800 rounded-full py-1">
            <Input.Control
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </Input.Root>
          <Input.Error />
        </label>

        <label
          htmlFor="password"
          className="flex flex-col font-normal text-gray-200 mb-4"
        >
          Senha
          <Input.Root className="bg-zinc-800 rounded-full py-1">
            <Input.Control
              id="password"
              name="password"
              type="password"
              placeholder="******"
              required
              minLength={6}
            />
          </Input.Root>
          <Input.Error />
        </label>

        <label
          htmlFor="confirmPassword"
          className="flex flex-col font-normal text-gray-200"
        >
          Confirme sua senha
          <Input.Root className="bg-zinc-800 rounded-full py-1">
            <Input.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="******"
              required
              minLength={6}
            />
          </Input.Root>
          <Input.Error />
        </label>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-zinc-700 p-3 mt-5 w-5/6 self-center rounded-full text-sm text-gray-200 font-semibold hover:bg-zinc-800 transition disabled:bg-zinc-800"
        >
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </button>

        <span className="self-center my-5" >
          <Link href="/login">Já tem uma conta? Faça login</Link>
        </span>
      </form>
    </div>
  )
} 