'use client'

import { getDirectChats } from "@/actions/chats";
import { getUserProfile } from "@/actions/user";
import * as Input from "@/app/ui/Input";
import { EllipsisVerticalIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useChats } from "../lib/context/chatContext";
import { useUser } from "../lib/context/userContext";
import { useWebSocket } from "../lib/context/webSocketContext";
import ChatList from "../ui/ContactList";


export default function Layout({ children }: {
  children: React.ReactNode
}) {
  const { setUser } = useUser()
  const { setChats, chats } = useChats()
  const { setIsLoggedIn } = useWebSocket()

  useEffect(() => {
    getUserProfile().then(setUser)
    getDirectChats().then(setChats)

    return () => {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className="bg-black pb-36 h-screen">
      <header className="fixed top-0 px-5 pt-4 flex w-full flex-col bg-black">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-2xl font-bold truncate">
            Chats
          </h3>

          <div className="flex gap-4">
            <button>
              <UserPlusIcon className="size-6" />
            </button>
            <button>
              <EllipsisVerticalIcon className="size-7" />
            </button>
          </div>
        </div>

        <Input.Root className="bg-zinc-700/40 rounded-full">
          <Input.Prefix>
            <MagnifyingGlassIcon className="size-4" />
          </Input.Prefix>
          <Input.Control placeholder="Search" />
        </Input.Root>

        <div
          className="flex gap-2 py-4 *:bg-gray-600 *:text-gray-200 *:px-3 *:py-1.5 *:rounded-full *:font-medium text-xs"
        >
          <button>All</button>
          <button>Unread</button>
          <button>Favorites</button>
          <button>Groups</button>
        </div>
      </header>

      <ChatList chats={chats} />

      <main>{children}</main>
    </div>
  );
}
