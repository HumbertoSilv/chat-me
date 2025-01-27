import * as Input from "@/app/ui/Input";
import { ChevronLeftIcon, EllipsisVerticalIcon, FaceSmileIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Message from "../../ui/Message";


const messages = [
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  },
  {
    content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
    sentAt: new Date("2024-10-19 09:40:00")
  },
  {
    content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
    sentAt: new Date("2024-10-18 09:40:00"),
  },
  {
    content: "What's up?",
    sentAt: new Date("2024-10-19 22:45:00"),
  }
]

export default async function ChatPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="fixed top-0 flex flex-col h-screen w-full bg-[url('/grid.svg')] bg-[#0a0a0b]">
      <header className="fixed top-0 flex justify-between items-center w-full p-4 py-2 bg-black border-b border-gray-800">
        <div className="flex gap-2 items-center">
          <Link href={'/chat'}>
            <ChevronLeftIcon className="size-7" />
          </Link>
          <Image
            src=""
            className="size-10 rounded-full"
            width={40}
            height={40}
            alt=""
          />
          <h1 className="text-xl text-white font-semibold pl-2">
            {id}
          </h1>
        </div>

        <nav className="flex gap-3">
          <button>
            <MagnifyingGlassIcon className="size-5" />
          </button>
          <button>
            <EllipsisVerticalIcon className="size-6" />
          </button>
        </nav>
      </header>

      <main className="overflow-auto pt-16 h-full pb-3">
        {messages.map((msg, i) => {
          return <Message key={i} message={msg} />
        })}
      </main>

      <footer className="flex items-center gap-2 p-3">
        <Input.Root className="bg-zinc-700 mt-0 py-1 rounded-3xl">
          <button>
            <FaceSmileIcon className="size-6" />
          </button>
          <Input.Control placeholder="Type a message" />
          <button>
            <PaperClipIcon className="size-6" />
          </button>
        </Input.Root>

        <button className="bg-gray-600 rounded-full p-2">
          <PaperAirplaneIcon className="size-7 text-white" />
        </button>
      </footer>
    </div>
  );
}