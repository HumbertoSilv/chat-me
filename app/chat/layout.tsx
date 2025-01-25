import * as Input from "@/app/ui/Input";
import { EllipsisVerticalIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import ContactList from "../ui/ContactList";


const data = {
  contacts: [
    {
      user: "thomas",
      imageProfileURL: "https://github.com/Thomas.png",
      name: "Thomas Smith",
      lastMessage: {
        content: "The later submodules are also included inside the former if you want to use multiple features from the list.",
        sentAt: new Date("2024-10-19 09:40:00"),
      }
    },
    {
      user: "jack",
      imageProfileURL: "https://github.com/jack.png",
      name: "Jack with",
      lastMessage: {
        content: "Hey there! xxxxxxxxxxxxxxxxxxxxxx",
        sentAt: new Date("2024-10-18 09:40:00"),
      }
    },
    {
      user: "larry",
      imageProfileURL: "https://github.com/larry.png",
      name: "Larry Doe",
      lastMessage: {
        content: "What's up?",
        sentAt: new Date("2024-10-19 22:45:00"),
      }
    }
  ]
}
export default function Layout({ children }: {
  children: React.ReactNode
}) {
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

        <Input.Root className="bg-zinc-700/40 py-0 rounded-full">
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

      <ContactList contacts={data.contacts} />

      <main>{children}</main>
    </div>
  );
}
