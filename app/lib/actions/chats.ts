'use server'

import { getDirectChatsReq } from "../apis/api"

export const getDirectChats = async () => {
  const chats = await getDirectChatsReq()

  const formattedChats = chats.map((chat) => (
    {
      chatId: chat.id,
      chatType: chat.chat_type,
      users: chat.users,
      lastMessage: {
        id: chat.last_message.id,
        content: chat.last_message.content,
        createdAt: chat.last_message.created_at,
        updatedAt: chat.last_message?.updated_at
      }
    }
  ))

  return formattedChats
}