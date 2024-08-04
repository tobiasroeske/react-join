import styles from '../contactsPage.module.css'

type NewContactButtonProps = {
    showPopup: () => void,
}

function NewContactButton({showPopup}: NewContactButtonProps) {
    return ( 
        <button className={styles.addContactBtn} onClick={showPopup}>
            Add new Contact <img src="/assets/icons/add_contact.png" alt="" />
        </button>
     );
}

export default NewContactButton;
