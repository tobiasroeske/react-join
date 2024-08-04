import { useEffect, useState } from 'react';
import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'
import ContactDetail from './contactDetailComponent';
import ContactHeadline from './contactHeadlineComponent';

type ContactPreviewProps = {
    selectedContact: Contact | null
    onEditContact: () => void,
    creationSuccesful: boolean;
}

function ContactPreview({ selectedContact, onEditContact, creationSuccesful }: ContactPreviewProps) {
    const [contact, setContact] = useState<Contact | null>(null)

    useEffect(() => {
        if (selectedContact) {
            setContact(selectedContact)
        }
    }, [selectedContact])

    function handleSetContact(selectedContact: Contact | null) {
        setContact(selectedContact);
    }

    return (
        <div className={styles.contactPreview}>
            <ContactHeadline />
            {contact && <ContactDetail creationSuccesful={creationSuccesful} handleSelectContact={handleSetContact}
                selectedContact={selectedContact}
                onEditContact={() => onEditContact()} />}
        </div>
    );
}

export default ContactPreview;