'use client'

import { actionLogin } from "@/actions/login";
import * as Input from "@/app/ui/Input";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [, action, isPending] = useActionState(actionLogin, null)

  return (
    <div className="p-8">
      <form
        action={action}
        className="flex flex-col max-w-[450px] m-auto mt-18">
        <h1 className="text-6xl font-medium py-8 text-white mb-8">
          Faça seu login.
        </h1>

        <label
          htmlFor="username"
          className="flex flex-col font-normal text-gray-200 mb-4"
        >
          Seu usuário
          <Input.Root className="bg-zinc-800 rounded-full py-1">
            <Input.Control
              id="username"
              name="username"
              type="username"
              placeholder="@usuario"
              required
            />
          </Input.Root>
          <Input.Error />
        </label>

        <label
          htmlFor="email"
          className="flex flex-col font-normal text-gray-200"
        >
          Senha
          <Input.Root className="bg-zinc-800 rounded-full py-1">
            <Input.Control
              id="password"
              name="password"
              type="password"
              placeholder="******"
              required
            />
          </Input.Root>
          <Input.Error />
        </label>

        <span className="text-sm text-gray-200 self-end" >
          <Link href="/recover-password">
            <u>Esqueci minha senha</u>
          </Link>
        </span>

        <button
          disabled={isPending}
          type="submit"
          className="bg-zinc-700 p-3 mt-5 w-5/6 self-center rounded-full text-sm text-gray-200 font-semibold hover:bg-zinc-800 transition disabled:bg-zinc-800"
        >
          Entrar
        </button>

        <button
          className="flex gap-2 bg-white text-zinc-800 text-sm p-1 mt-4 w-2/3 self-center justify-center items-center rounded-2xl"
        >
          Faça login com o Google
        </button>

        <span className="self-center my-5" >
          <Link href="/sign-up">Ainda não tem uma conta?</Link>
        </span>
      </form>
    </div>
  )
}