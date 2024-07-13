import useContactInitials from '../../shared/hooks/useContactInitials';
import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'

type ContactButtonProps = {
    contact: Contact,
    onContactSelect: () => void
}

function ContactButton({ contact, onContactSelect }: ContactButtonProps) {
    let initials = useContactInitials(contact)
    

    return ( 
        <div className={styles.contactButton} onClick={onContactSelect}>
            <div className={styles.initials} style={{backgroundColor: contact.color}}>
                {initials}
            </div>
            {contact.name}
        </div>
     );
}

export default ContactButton;