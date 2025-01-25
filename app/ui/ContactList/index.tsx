import _ from "lodash"
import Contact from "../Contact"

interface IContactInfo {
  user: string,
  imageProfileURL: string,
  name: string,
  lastMessage: {
    content: string,
    sentAt: Date,
  },
}

export default function ContactList({ contacts }: { contacts: IContactInfo[] }) {
  const sortedContacts = _.orderBy(contacts, "lastMessage.sentAt", "desc")

  return (
    <aside className="pt-40 px-5">
      <ul>
        {sortedContacts.map((user, i) => {
          return (
            <Contact key={i} {...user} />
          )
        })}
      </ul>
    </aside>
  )
}
