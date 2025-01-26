import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const messageContainer = tv({
  base: [
    'flex gap-4 w-fit rounded-2xl bg-zinc-800 mx-3 my-1 px-3 py-1 max-w-[80%]',
  ],
  variants: {
    variant: {
      sent: 'justify-self-end',
      received: 'bg-zinc-600',
    },
  },
  defaultVariants: {
    variant: 'sent',
  },
})

interface MessagePayload {
  message: {
    content: string
    sentAt: Date
  }
}

export type MessageProps = ComponentProps<'div'> & VariantProps<typeof messageContainer> & MessagePayload


export default function Message({ variant, className, message }: MessageProps) {
  return (
    <div className={messageContainer({ variant, className })}>
      <span className="text-sm text-gray-200">
        {message.content}
      </span>
      {/*TODO: future implementation */}
      {/* <time
        className="text-[8px] self-end"
        // title={sentAtDateFormatted}
        dateTime={message.sentAt.toISOString()}
      >
        {message.sentAt.toISOString()}
      </time> */}
    </div>
  )
}