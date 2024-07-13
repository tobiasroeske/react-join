import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'
import ContactList from './contactListComponent';
import NewContactButton from './newContactComponent';


type ContactBarProps = {
    onContactSelect: (contact: Contact) => void,
    onShowPopup: () => void
}

function ContactBar({onContactSelect, onShowPopup}: ContactBarProps) {
    return (

        <div className={styles.sidebar}>
            <NewContactButton showPopup={() => onShowPopup()} />
            <ContactList onContactSelect={onContactSelect} />
        </div>

    );
}

export default ContactBar;