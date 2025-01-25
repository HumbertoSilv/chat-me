import { format, isSameDay } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface IContactInfo {
  user: string,
  imageProfileURL: string,
  name: string,
  lastMessage: {
    content: string,
    sentAt: Date,
  },
}

export default function Contact({ user, name, imageProfileURL, lastMessage }: IContactInfo) {
  const formatStr = isSameDay(lastMessage.sentAt, new Date()) ? "HH:mm" : "dd/MM/yyyy"
  const sentAtDateFormatted = format(lastMessage.sentAt, formatStr);

  return (
    <Link
      href={`/chat/${user}`}
      className="flex gap-5 py-4 hover:bg-zinc-900/40 transition"
    >
      <Image
        src={imageProfileURL}
        className="size-12 rounded-full"
        width={48}
        height={48}
        alt=""
      />

      <div className="flex flex-1 border-b border-gray-700 truncate">
        <div className="flex-1 w-1/3">
          <span className="text-white">
            {name}
          </span>
          <p className="truncate text-sm">
            {lastMessage.content}
          </p>
        </div>

        <time
          className="text-xs"
          title={sentAtDateFormatted}
          dateTime={lastMessage.sentAt.toISOString()}
        >
          {sentAtDateFormatted}
        </time>
      </div>
    </Link>
  )
}