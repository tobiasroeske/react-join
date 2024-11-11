import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'
import { Contact } from '../../shared/interfaces/contact.interface'
import { useAuthContext } from '../../shared/authProvider'

function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const { user, loading } = useAuthContext()

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
