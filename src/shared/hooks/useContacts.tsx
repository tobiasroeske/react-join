import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'
import { Contact } from '../../shared/interfaces/contact.interface'
import { useAuthContext } from '../../shared/authProvider'

/**
 * Custom hook to fetch contacts from Firestore for the authenticated user.
 *
 * @returns {Contact[]} The list of contacts for the authenticated user.
 */
function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const { user, loading } = useAuthContext()

  /**
   * Effect to fetch contacts from Firestore when the user is authenticated.
   *
   * Sets up a Firestore query to listen for changes to the contacts collection
   * and updates the state with the fetched contacts.
   */
  useEffect(() => {
    if (!loading && user) {
      const q = query(
        collection(firestore, 'contacts'),
        where('creatorId', '==', user.uid)
      )
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const contacts: Contact[] = []
        querySnapshot.forEach((doc) => {
          contacts.push({ ...doc.data() } as Contact)
        })
        setContacts(contacts.sort((a, b) => a.name.localeCompare(b.name)))
      })
      return () => unsubscribe()
    }
  }, [loading, user])

  return contacts
}

export default useContacts
