import React, { useEffect, useState } from 'react';
import styles from '../contactsPage.module.css'
import ContactButton from './contactButtonComponent';
import { Contact } from '../../shared/interfaces/contact.interface';
import useContacts from '../../shared/hooks/useContacts';


type ContactListProps = { onContactSelect: (contact: Contact) => void }

function ContactList({ onContactSelect }: ContactListProps) {
    const [initials, setInitials] = useState<string[]>([]);
    let contacts = useContacts()

    function getUniqueInitials(contacts: Contact[]): string[] {
        const initialsSet: Set<string> = new Set();
        contacts.forEach(contact => {
            const initial = contact.name.charAt(0).toUpperCase();
            initialsSet.add(initial);
        });
        return Array.from(initialsSet);
    }

    useEffect(() => {
        setInitials(getUniqueInitials(contacts))
    }, [contacts]);

    return (
        <div className={styles.contactList}>
            {initials.map((char, index) =>
                <React.Fragment key={index}>
                    <div className={styles.letterContainer}>{char}</div>
                    <div className={styles.seperator}></div>
                    {contacts.filter(contact => contact.name.startsWith(char)).map((c) =>
                        <React.Fragment key={c.email}>
                            <ContactButton onContactSelect={() => onContactSelect(c)} contact={c} />
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default ContactList;