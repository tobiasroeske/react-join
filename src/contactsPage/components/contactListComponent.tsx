import React, { useEffect, useState } from 'react';
import styles from '../contactsPage.module.css'
import ContactButton from './contactButtonComponent';
import { Contact } from '../../shared/interfaces/contact.interface';
import useContacts from '../../shared/hooks/useContacts';


type ContactListProps = { onContactSelect: (contact: Contact) => void }

function ContactList({ onContactSelect }: ContactListProps) {
    const [initials, setInitials] = useState<string[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    let contacts = useContacts()

    useEffect(() => {
        const uniqueInitials = Array.from(new Set(contacts.map(contact => contact.name.charAt(0).toUpperCase())));
        setInitials(uniqueInitials);
    }, [contacts]);

    const handleContactSelect = (contact: Contact) => {
        setSelectedContact(contact);
        onContactSelect(contact);
    };

    return (
        <div className={styles.contactList}>
            {initials.map((char, index) =>
                <React.Fragment key={index}>
                    <div className={styles.letterContainer}>{char}</div>
                    <div className={styles.seperator}></div>
                    {contacts.filter(contact => contact.name.startsWith(char)).map((contact) =>
                        <React.Fragment key={contact.id}>
                            <ContactButton 
                                contact={contact} 
                                onContactSelect={() => handleContactSelect(contact)} 
                                isSelected={selectedContact === contact}
                            />
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default ContactList;