import styles from '../contactsPage.module.css';
import classNames from 'classnames';
import EditContactForm from './editContactFormComponent';
import { useEffect, useState } from 'react';
import { Contact } from '../../shared/interfaces/contact.interface';

const TRANSITION_DELAY = 125;

let cancelSvg = (<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>
)

type EditContactComponentProps = {
    onShowPopup: () => void,
    selectedContact: Contact | null,
    onContactEdit: (contact: Contact | null) => void,
}

function EditContactComponent({ onShowPopup, selectedContact, onContactEdit }: EditContactComponentProps) {
    const [formVisible, setFormVisible] = useState<boolean>(false);

    useEffect(() => {
        setFormVisible(true);
    }, []);
    
    const handleClose = () => {
        setFormVisible(false);
        setTimeout(onShowPopup, TRANSITION_DELAY);
    };

    return (
        <div className={classNames(styles.dialogContainer, { [styles.show]: formVisible })}>
            <div className={styles.leftside}>
                <img src="/assets/img/logo_dark.png" alt="" />
                <div className={styles.addContactContent}>
                    <h1>Edit contact</h1>
                    <div className={styles.dialogSeperator}></div>
                </div>
            </div>
            <div className={styles.rightside}>
                <div className={styles.imgContainer}>
                    <img src="/assets/icons/person_contacts.png" alt="" />
                </div>

                <EditContactForm selectedContact={selectedContact} onShowPopup={handleClose} onContactEdit={onContactEdit}/>
                <div className={styles.cancelIcon} onClick={handleClose}>{cancelSvg}</div>
            </div>
        </div>
    );
}

export default EditContactComponent;