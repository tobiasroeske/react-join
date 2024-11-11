import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Contact } from '../../shared/interfaces/contact.interface'
import { useFirestoreContext } from '../../shared/firestoreProvider'
import styles from '../contactsPage.module.css'

type FormFields = {
  name: string
  email: string
  phone: string
}

type EditContactFormProps = {
  selectedContact: Contact | null
  onContactEdit: (contact: Contact | null) => void
  onShowPopup: () => void
}

/**
 * EditContactForm component.
 *
 * @param {EditContactFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function EditContactForm({
  selectedContact,
  onContactEdit,
  onShowPopup
}: EditContactFormProps) {
  const { editContact } = useFirestoreContext()
  const { register, handleSubmit, setValue } = useForm<FormFields>()
  const [contact, setContact] = useState<Contact | null>(null)
  const [contactName, setName] = useState<string>('')
  const [contactEmail, setEmail] = useState<string>('')
  const [phoneValue, setPhoneValue] = useState<string>('')

  /**
   * Effect to set the form values when the selected contact changes.
   */
  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact)
      setValue('name', selectedContact.name)
      setValue('email', selectedContact.email)
      setValue('phone', selectedContact.phone)
      setPhoneValue(selectedContact.phone)
    }
  }, [selectedContact, setValue])

  /**
   * Handles the form submission to edit a contact.
   *
   * @param {FormFields} data - The form data.
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (contact) {
      const editedContact = {
        name: contactName,
        email: contactEmail,
        phone: phoneValue,
        creatorId: contact.creatorId,
        color: contact.color,
        id: contact.id
      }
      await editContact({ ...(editedContact as Contact) })
      onContactEdit(editedContact as Contact)
      onShowPopup()
    }
  }

  /**
   * Handles input change for the form fields.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'nameInput') {
      const { value } = e.target
      setName(value)
    }
    if (e.target.id === 'emailInput') {
      const { value } = e.target
      setEmail(value)
    }
    if (e.target.id === 'phoneInput') {
      let { value } = e.target
      value = value.replace(/[^0-9+]/g, '')
      setPhoneValue(value)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Form fields and submit button */}
    </form>
  )
}

export default EditContactForm
