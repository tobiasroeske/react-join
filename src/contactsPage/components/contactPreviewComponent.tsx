import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'
import ContactDetail from './contactDetailComponent';
import ContactHeadline from './contactHeadlineComponent';

type ContactPreviewProps = {
    selectedContact: Contact | null
    slidedIn: boolean
}

function ContactPreview({selectedContact , slidedIn}: ContactPreviewProps) {
    
    return ( 
        <div className={styles.contactPreview}>
            <ContactHeadline />
            {selectedContact && <ContactDetail slidedIn={slidedIn} selectedContact={selectedContact}/>}
        </div>
     );
}

export default ContactPreview;