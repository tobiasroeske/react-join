import styles from '../contactsPage.module.css'

function ContactHeadline() {
    return ( 
        <div className={styles.headline}>
            <h1>Contacts</h1>
            <div className={styles.seperatorHeadline}></div>
            <span>Better with a team</span>
            <div className={styles.seperatorHeadlineMobile}></div>
        </div>
     );
}

export default ContactHeadline;