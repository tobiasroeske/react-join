import { Contact } from '../../shared/interfaces/contact.interface'
import styles from '../contactsPage.module.css'
import ContactList from './contactListComponent'
import NewContactButton from './newContactComponent'

type ContactBarProps = {
  onContactSelect: (contact: Contact) => void
  onShowPopup: () => void
  contactDetailVisibility: boolean
  showContact: () => void
}

function ContactBar({
  onContactSelect,
  onShowPopup,
  contactDetailVisibility,
  showContact
}: ContactBarProps) {
  return (
    <div
      className={styles.sidebar}
      style={contactDetailVisibility ? {} : { width: '100%' }}
    >
      <NewContactButton showPopup={onShowPopup} />
      <ContactList
        onContactSelect={onContactSelect}
        showContact={showContact}
      />
    </div>
  )
}

export default ContactBar
