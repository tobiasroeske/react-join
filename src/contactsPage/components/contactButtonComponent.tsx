import useContactInitials from '../../shared/hooks/useContactInitials'
import { Contact } from '../../shared/interfaces/contact.interface'
import styles from '../contactsPage.module.css'

type ContactButtonProps = {
  contact: Contact
  onContactSelect: () => void
  isSelected: boolean
  showContact: () => void
}

function ContactButton({
  contact,
  onContactSelect,
  isSelected,
  showContact
}: ContactButtonProps) {
  const initials = useContactInitials(contact)

  function handleClick() {
    onContactSelect()
    showContact()
  }

  return (
    <div
      className={styles.contactButton}
      onClick={handleClick}
      style={
        isSelected
          ? { backgroundColor: '#2A3647', color: 'white' }
          : { backgroundColor: '' }
      }
    >
      <div
        className={styles.initials}
        style={{ backgroundColor: contact.color }}
      >
        {initials}
      </div>
      {contact.name}
    </div>
  )
}

export default ContactButton
