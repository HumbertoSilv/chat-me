import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputPrefixProps = ComponentProps<'div'>
type InputControlProps = ComponentProps<'input'>
type InputRootProps = ComponentProps<'div'>
type InputErrorProps = ComponentProps<'div'> & {
  error?: string | string[]
}


export function Prefix(props: InputPrefixProps) {
  return <div {...props} />
}

export function Error({ error }: InputErrorProps) {
  return (
    <span className="h-7 pt-1 pl-3 text-base text-red-400">{error}</span>
  )
}

export function Control(props: InputControlProps) {
  return (
    <input
      className="flex-1 p-2 bg-transparent outline-none font-medium"
      {...props}
    />
  )
}

export function Root({ className, ...props }: InputRootProps) {
  return (
    <div
      className={twMerge(
        "flex w-full items-center gap-2 px-4 py-2 mt-4 rounded-2xl border border-gray-700",
        className)}
      {...props}
    />
  )
}