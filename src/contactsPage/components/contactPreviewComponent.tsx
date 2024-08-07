import { useEffect, useState } from 'react';
import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css';
import ContactDetail from './contactDetailComponent';
import ContactHeadline from './contactHeadlineComponent';

type ContactPreviewProps = {
    selectedContact: Contact | null;
    onEditContact: () => void;
    creationSuccessful: boolean,
    showContact: () => void,
}

function ContactPreview({ selectedContact, onEditContact, creationSuccessful, showContact }: ContactPreviewProps) {
    const [contact, setContact] = useState<Contact | null>(null);

    useEffect(() => {
        if (selectedContact) {
            setContact(selectedContact);
        }
    }, [selectedContact]);

    function handleSelectContact(selectedContact: Contact | null) {
        setContact(selectedContact);
    }

    return (
        <div className={styles.contactPreview}>
            <div className={styles.backArrow} onClick={showContact}>
                <img src="./assets/icons/back_arrow.png" alt="" />
            </div>
            <ContactHeadline />
            {contact && <ContactDetail
                creationSuccessful={creationSuccessful}
                onSelectContact={handleSelectContact}
                selectedContact={contact}
                onEditContact={onEditContact}
            />}
        </div>
    );
}

export default ContactPreview;
