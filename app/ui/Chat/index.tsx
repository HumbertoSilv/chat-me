'use client'

import { format, isSameDay } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IChat, ICurrentChat, useChats } from "../../lib/context/chatContext";
import { useUser } from "../../lib/context/userContext";


export default function Chat({ chatId, chatType, users, lastMessage }: IChat) {
  const { user } = useUser()
  const { setCurrentChat } = useChats()
  const userChat = users.find((usr) => usr.username !== user.username)
  const formatStr = isSameDay(lastMessage.createdAt, new Date()) ? "HH:mm" : "dd/MM/yyyy"
  const sentAtDateFormatted = format(lastMessage.createdAt, formatStr);

  const handleOpenChat = ({ chatId, chatType, users }: ICurrentChat) => {
    setCurrentChat({ chatId, chatType, users })
    redirect(`/chat/${chatId}`)
  }

  return (
    <li
      onClick={() => handleOpenChat({ chatId, chatType, users })}
      className="flex gap-5 py-4 hover:bg-zinc-900/40 transition"
    >
      <Image
        src={userChat?.avatar_url as string}
        className="size-12 rounded-full"
        width={48}
        height={48}
        alt=""
      />

      <div className="flex flex-1 border-b border-gray-700 truncate">
        <div className="flex-1 w-1/3">
          <span className="text-white">
            {userChat?.name}
          </span>
          <p className="truncate text-sm">
            {lastMessage.content}
          </p>
        </div>

        <time
          className="text-xs"
          title={sentAtDateFormatted}
          dateTime={lastMessage.createdAt.toString()}
        >
          {sentAtDateFormatted}
        </time>
      </div>
    </li>
  )
}