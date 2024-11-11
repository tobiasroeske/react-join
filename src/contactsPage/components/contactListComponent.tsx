import React, { useEffect, useState } from 'react'
import styles from '../contactsPage.module.css'
import ContactButton from './contactButtonComponent'
import { Contact } from '../../shared/interfaces/contact.interface'
import useContacts from '../../shared/hooks/useContacts'

type ContactListProps = {
  onContactSelect: (contact: Contact) => void
  showContact: () => void
}

/**
 * ContactList component.
 *
 * @param {ContactListProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function ContactList({ onContactSelect, showContact }: ContactListProps) {
  const [initials, setInitials] = useState<string[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const contacts = useContacts()

  /**
   * Effect to extract unique initials from the contacts list.
   *
   * Updates the state variable `initials` with the unique initials.
   */
  useEffect(() => {
    const uniqueInitials = Array.from(
      new Set(contacts.map((contact) => contact.name.charAt(0).toUpperCase()))
    )
    setInitials(uniqueInitials)
  }, [contacts])

  /**
   * Handles the selection of a contact.
   *
   * @param {Contact} contact - The selected contact.
   */
  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    onContactSelect(contact)
  }

  return (
    <div className={styles.contactList}>
      {initials.map((char, index) => (
        <React.Fragment key={index}>
          <div className={styles.letterContainer}>{char}</div>
          <div className={styles.separator}></div>
          {contacts
            .filter((contact) => contact.name.startsWith(char))
            .map((contact) => (
              <ContactButton
                key={contact.id}
                contact={contact}
                onContactSelect={() => handleContactSelect(contact)}
                isSelected={selectedContact === contact}
                showContact={showContact}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContactList
