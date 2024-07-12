import React, { useEffect, useState } from 'react';
import styles from '../contactsPage.module.css'
import ContactButton from './contactButtonComponent';
import { Contact } from '../../shared/interfaces/contact.interface';
import { useFirestoreContext } from '../../shared/firestoreProvider';
import { log } from 'console';
import { useAuthContext } from '../../shared/authProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';


type ContactListProps = { onContactSelect: (contact: Contact) => void }

function ContactList({ onContactSelect }: ContactListProps) {
    const [initials, setInitials] = useState<string[]>([]);
    const [sortedContacts, setSortedCOntacts] = useState<Contact[]>([])
    const [allContacts, setAllContacts] = useState<Contact[]>([])
    const authContext = useAuthContext();
    const {user, loading} = authContext
    
    let firstCharacters = ['A', 'B', 'D', 'E', 'M', 'O']

    function getUniqueInitials(contacts: Contact[]): string[] {
        const initialsSet: Set<string> = new Set();
        contacts.forEach(contact => {
            const initial = contact.name.charAt(0).toUpperCase();
            initialsSet.add(initial);
        });
        return Array.from(initialsSet);
    }

    useEffect(() => {
        if (!loading) {
            const q = query(collection(firestore,'contacts'), where('creatorId', '==', user!.uid))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const contacts: Contact[] = [];
                querySnapshot.forEach((doc) => {
                    contacts.push({...doc.data() } as Contact);
                });
                setSortedCOntacts(contacts)
                setAllContacts(contacts);
                setInitials(getUniqueInitials(contacts));
            })
            return unsubscribe;
        }
    }, []);

    return (
        <div className={styles.contactList}>
            {initials.map((char, index) =>
                <React.Fragment key={index}>
                    <div className={styles.letterContainer}>{char}</div>
                    <div className={styles.seperator}></div>
                    {sortedContacts.filter(contact => contact.name.startsWith(char)).map((c, index) =>
                        <React.Fragment key={index}>
                            <ContactButton onContactSelect={() => onContactSelect(c)} contact={c} />
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default ContactList;