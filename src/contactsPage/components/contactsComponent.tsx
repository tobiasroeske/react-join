import { useEffect, useState } from 'react'
import ContactBar from './contactBarComponent'
import ContactPreview from './contactPreviewComponent'
import { Contact } from '../../shared/interfaces/contact.interface'
import Popup from './popupComponent'

const TRANSITION_DELAY = 2000

function Contacts() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [editContact, setEditContact] = useState<boolean>(false)
  const [creationSuccessful, setCreationSuccessful] = useState<boolean>(false)
  const [contactDetailVisibility, setContactDetailVisibility] =
    useState<boolean>(window.innerWidth > 1060)
  const [showContact, setShowContact] = useState<boolean>(false)

  function handleContactSelect(contact: Contact) {
    setSelectedContact(contact)
  }

  function checkScreenSize() {
    setContactDetailVisibility(window.innerWidth > 1060)
  }

  useEffect(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    console.log(showContact)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [contactDetailVisibility, showContact])

  function togglePopup() {
    setShowPopup(!showPopup)
  }

  function handleShowContact() {
    if (!contactDetailVisibility) {
      setShowContact((prev) => !prev)
    }
  }

  function showSuccessMessage() {
    if (window.innerWidth < 1060) {
      handleShowContact()
    }
    setCreationSuccessful(true)
    setTimeout(() => {
      setCreationSuccessful(false)
    }, TRANSITION_DELAY)
  }

  function handleEditContact() {
    togglePopup()
    setEditContact(true)
  }

  function handleContactEdit(contact: Contact | null) {
    setSelectedContact(contact)
  }

  return (
    <>
      {!showContact && (
        <ContactBar
          onContactSelect={handleContactSelect}
          onShowPopup={togglePopup}
          contactDetailVisibility={contactDetailVisibility}
          showContact={handleShowContact}
        />
      )}
      {(contactDetailVisibility || showContact) && (
        <ContactPreview
          creationSuccessful={creationSuccessful}
          selectedContact={selectedContact}
          onEditContact={handleEditContact}
          showContact={handleShowContact}
        />
      )}
      {showPopup && (
        <Popup
          onCreationSuccessful={showSuccessMessage}
          onShowPopup={togglePopup}
          editContact={editContact}
          selectedContact={selectedContact}
          onContactEdit={handleContactEdit}
        />
      )}
    </>
  )
}

export default Contacts
