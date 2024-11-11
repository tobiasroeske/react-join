import { useMemo } from 'react'
import getInitials from '../utils/getInitials'

type Contact = {
  name: string
  email: string
  color: string
}

/**
 * Custom hook to get the initials of a contact.
 *
 * @param {Contact | null} contact - The contact object.
 * @returns {string} The initials of the contact's name.
 */
function useContactInitials(contact: Contact | null): string {
  /**
   * Memoized computation of the contact's initials.
   *
   * @returns {string} The initials of the contact's name.
   */
  const initials = useMemo(() => {
    if (!contact) return ''
    return getInitials(contact.name)
  }, [contact])

  return initials
}

export default useContactInitials
