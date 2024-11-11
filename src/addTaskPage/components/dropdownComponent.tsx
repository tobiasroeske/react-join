import { Contact } from '../../shared/interfaces/contact.interface'
import getInitials from '../../shared/utils/getInitials'
import styles from '../addTaskPage.module.css'

type DropdownProps = {
  contacts: Contact[]
  onContactSelect: (contact: Contact, e: React.MouseEvent) => void
  selectedContacts: Contact[]
}

function Dropdown({
  contacts,
  onContactSelect,
  selectedContacts
}: DropdownProps) {
  function contactExists(selectedContact: Contact) {
    return selectedContacts.some((contact) => contact.id === selectedContact.id)
  }

  return (
    <div className={styles.dropdownMenu}>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className={styles.contactBox}
            style={
              contactExists(contact)
                ? { backgroundColor: '#2A3647', color: 'white' }
                : { backgroundColor: '' }
            }
            onClick={(e) => onContactSelect(contact, e)}
          >
            <div
              className={styles.initials}
              style={{ backgroundColor: contact.color }}
            >
              {getInitials(contact.name)}
            </div>
            {contact.name}
          </div>
        ))
      ) : (
        <div className={styles.contactBox}>So far not contacts added</div>
      )}
    </div>
  )
}

export default Dropdown
