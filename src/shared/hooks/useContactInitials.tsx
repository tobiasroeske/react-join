import { useMemo } from 'react'
import getInitials from '../utils/getInitials'

type Contact = {
  name: string
  email: string
  color: string
}

function useContactInitials(contact: Contact | null): string {
  const initials = useMemo(() => {
    if (!contact) return ''
    return getInitials(contact.name)
  }, [contact])
  return initials
}

export default useContactInitials
