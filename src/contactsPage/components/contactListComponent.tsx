import React, { useEffect, useState } from 'react';
import styles from '../contactsPage.module.css';
import ContactButton from './contactButtonComponent';
import { Contact } from '../../shared/interfaces/contact.interface';
import useContacts from '../../shared/hooks/useContacts';

type ContactListProps = { 
    onContactSelect: (contact: Contact) => void;
    showContact: () => void; 
}

function ContactList({ onContactSelect, showContact }: ContactListProps) {
    const [initials, setInitials] = useState<string[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const contacts = useContacts();

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
            {initials.map((char, index) => (
                <React.Fragment key={index}>
                    <div className={styles.letterContainer}>{char}</div>
                    <div className={styles.separator}></div>
                    {contacts
                        .filter(contact => contact.name.startsWith(char))
                        .map(contact => (
                            <ContactButton 
                                key={contact.id}
                                contact={contact} 
                                onContactSelect={() => handleContactSelect(contact)} 
                                isSelected={selectedContact === contact}
                                showContact={showContact}
                            />
                        ))
                    }
                </React.Fragment>
            ))}
        </div>
    );
}

export default ContactList;
