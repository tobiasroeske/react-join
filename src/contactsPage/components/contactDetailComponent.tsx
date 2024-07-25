
import useContactInitials from '../../shared/hooks/useContactInitials';
import { Contact } from '../../shared/interfaces/contact.interface';
import styles from '../contactsPage.module.css'
import classNames from 'classnames';
import { useFirestoreContext } from '../../shared/firestoreProvider';


type ContactDetailsProps = {
    selectedContact: Contact | null,
    onEditContact: () => void,
    handleSelectContact: (selectedContact: Contact | null) => void,
    creationSuccesful: boolean
}

//const TRANSITION_DELAY = 125

let editSvg = (<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.0612 22.1418H4.92787L16.4279 10.6418L14.5612 8.7751L3.0612 20.2751V22.1418ZM22.1279 8.70843L16.4612 3.10843L18.3279 1.24176C18.839 0.730653 19.4668 0.475098 20.2112 0.475098C20.9556 0.475098 21.5834 0.730653 22.0945 1.24176L23.9612 3.10843C24.4723 3.61954 24.739 4.23621 24.7612 4.95843C24.7834 5.68065 24.539 6.29732 24.0279 6.80843L22.1279 8.70843ZM20.1945 10.6751L6.0612 24.8084H0.394531V19.1418L14.5279 5.00843L20.1945 10.6751Z" fill="currentColor" />
</svg>
)

let deleteSvg = (<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="currentColor" />
</svg>
)

function ContactDetail({ selectedContact, onEditContact, handleSelectContact, creationSuccesful }: ContactDetailsProps) {
    const { deleteContact } = useFirestoreContext();
    let initials = useContactInitials(selectedContact);
    

    async function handleDeleteContact() {
        if (selectedContact) {
            await deleteContact(selectedContact.id)
            handleSelectContact(null);
        }
    }

    return (
        <div className={classNames(styles.contactDetail)}>
            <div className={styles.contactTop}>
                <div className={styles.initialsDetail} style={selectedContact ? { backgroundColor: selectedContact.color } : {}}>{initials}</div>
                <div className={styles.nameBox}>
                    {selectedContact && selectedContact.name}
                    <div className={styles.editBox}>
                        <span onClick={onEditContact}>{editSvg} Edit</span>
                        <span onClick={handleDeleteContact}>{deleteSvg} Delete</span>
                    </div>
                </div>
            </div>

            <span className={styles.information}>Contact Information</span>
            <div className={styles.emailContainer}>
                <div className={styles.emailBox}>
                    <span><b>Email:</b></span>
                    <span className={styles.emailLink}>{selectedContact && selectedContact.email}</span>
                </div>
                <div className={styles.emailBox}>
                    <span><b>Phone:</b></span>
                    <span>{selectedContact && selectedContact.phone}</span>
                </div>
            </div>

            <div className={classNames(styles.contactCreatedBox, { [styles.slideIn]: creationSuccesful })}>
                Contact succesfully created
            </div>
        </div>
    );
}

export default ContactDetail;