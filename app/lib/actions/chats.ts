'use server'

import { getDirectChatsReq } from "../apis/api"

export const getDirectChats = async () => {
  const chats = await getDirectChatsReq()

  const formattedChats = chats.map((chat) => (
    {
      chatId: chat.id,
      chatType: chat.chat_type,
      users: chat.users
    }
  ))

  return formattedChats
}