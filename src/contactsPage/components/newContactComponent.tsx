import styles from '../contactsPage.module.css'

function NewContactButton() {
    return ( 
        <button className={styles.addContactBtn}>
            Add new Contact <img src="/assets/icons/add_contact.png" alt="" />
        </button>
     );
}

export default NewContactButton;