import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'
import ContactList from './contactListComponent';
import NewContactButton from './newContactComponent';


type ContactBarProps = {onContactSelect: (contact: Contact) => void}

function ContactBar({onContactSelect}: ContactBarProps) {
    return (

        <div className={styles.sidebar}>
            <NewContactButton />
            <ContactList onContactSelect={onContactSelect}/>
        </div>

    );
}

export default ContactBar;