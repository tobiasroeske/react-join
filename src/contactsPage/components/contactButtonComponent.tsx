import { useState } from 'react';
import useContactInitials from '../../shared/hooks/useContactInitials';
import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'

type ContactButtonProps = {
    contact: Contact,
    onContactSelect: () => void,
    isSelected: boolean
}

function ContactButton({ contact, onContactSelect, isSelected }: ContactButtonProps) {
    let initials = useContactInitials(contact)
    
    return ( 
        <div className={styles.contactButton} onClick={onContactSelect} style={isSelected ? {backgroundColor: '#2A3647', color: 'white'} : {backgroundColor: ''}}>
            <div className={styles.initials} style={{backgroundColor: contact.color}}>
                {initials}
            </div>
            {contact.name}
        </div>
     );
}

export default ContactButton;