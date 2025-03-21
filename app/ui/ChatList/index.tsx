import _ from "lodash";
import { IChat } from "../../lib/context/chatContext";
import Chat from "../Chat";


export default function ChatList({ chats }: { chats: IChat[] }) {
  const chatsSortedByTheMostRecent = _.orderBy(
    chats,
    "lastMessage.createdAt",
    "desc"
  )

  return (
    <aside className="pt-40 px-5">
      <ul>
        {chatsSortedByTheMostRecent.map((chat, i) => {
          return (
            <Chat key={i} {...chat} />
          )
        })}
      </ul>
    </aside>
  )
}
