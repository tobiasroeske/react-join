import useContactInitials from '../../shared/hooks/useContactInitials';
import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'

type ContactButtonProps = {
    contact: Contact,
    onContactSelect: () => void
}

function ContactButton({ contact, onContactSelect }: ContactButtonProps) {
    let initials = useContactInitials(contact)
    //const colors: string [] = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646']

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