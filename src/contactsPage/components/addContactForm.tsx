import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../contactsPage.module.css'
import { useFirestoreContext } from '../../shared/firestoreProvider'
import { useAuthContext } from '../../shared/authProvider'
import { Contact } from '../../shared/interfaces/contact.interface'
import capitalizeFirstCharater from '../../shared/utils/capitalizeFirstCharacter'

type FormFields = {
  name: string
  email: string
  phone: string
}

type AddContactFormProps = {
  icon: React.ReactNode
  onShowPopup: () => void
  onContactCreation: (contact: Contact | null) => void
  creationSuccessful: () => void
}

/**
 * AddContactForm component.
 *
 * @param {AddContactFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function AddContactForm({
  icon,
  onShowPopup,
  onContactCreation,
  creationSuccessful
}: AddContactFormProps) {
  const { addContact } = useFirestoreContext()
  const { user } = useAuthContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormFields>()
  const [phoneValue, setPhoneValue] = useState<string>('')

  /**
   * Handles the form submission to add a new contact.
   *
   * @param {FormFields} data - The form data.
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (user) {
      const newContact = {
        ...data,
        creatorId: user.uid,
        color: getRandomColor(),
        id: ''
      }
      newContact.name = capitalizeFirstCharater(data.name)
      await addContact(newContact)
      onShowPopup()
      onContactCreation({ ...(newContact as Contact) })
      creationSuccessful()
      reset()
    }
  }

  /**
   * Gets a random color from the predefined colors array.
   *
   * @returns {string} A random color.
   */
  function getRandomColor(): string {
    const colors = [
      '#6E52FF',
      '#FC71FF',
      '#FFBB2B',
      '#1FD7C1',
      '#462F8A',
      '#FF4646'
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  /**
   * Handles input change for the phone number field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target
    value = value.replace(/[^0-9+]/g, '')
    setPhoneValue(value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className="inputContainer">
        <label htmlFor="nameInput" />
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Please enter at least 3 characters'
            }
          })}
          type="text"
          id="nameInput"
          name="name"
          placeholder="Name"
        />
        <img src="/assets/icons/person.png" alt="" />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <div className="inputContainer">
        <label htmlFor="emailInput" />
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Please enter a valid email address'
            }
          })}
          type="email"
          id="emailInput"
          name="email"
          placeholder="Email"
        />
        <img src="/assets/icons/mail.png" alt="" />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
        {errors.root && (
          <span className="error-message">{errors.root.message}</span>
        )}
      </div>

      <div className="inputContainer">
        <label htmlFor="phoneInput" />
        <input
          {...register('phone', {
            required: 'Phone is required',
            minLength: {
              value: 5,
              message: 'Please enter at least 5 characters'
            },
            pattern: {
              value: /^[0-9+]*$/,
              message: 'Only numbers and the plus sign are allowed'
            }
          })}
          type="text"
          id="phoneInput"
          name="phone"
          placeholder="Phone"
          onChange={handleInputChange}
          value={phoneValue}
        />
        <img src="/assets/icons/call.png" alt="" />
        {errors.phone && (
          <span className="error-message">{errors.phone.message}</span>
        )}
      </div>

      <div className={styles.formAction}>
        <div className={styles.cancelBtn} onClick={onShowPopup}>
          Cancel {icon}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Create Contact <img src="/assets/icons/check_contacts.png" alt="" />
        </button>
      </div>
    </form>
  )
}

export default AddContactForm
