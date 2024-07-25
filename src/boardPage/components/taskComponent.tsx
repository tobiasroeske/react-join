import styles from "../boardPage.module.css"

function Task() {
    return (
        <div className={styles.task}>
            <div className={styles.category}>
                User Story
            </div>
            <div className={styles.titleDescription}>
                <h4>Contact Form & Imprint</h4>
                <div className={styles.description}>
                    Create a contact form and imprint page ...
                </div>
            </div>


            <div className={styles.subtasksProgress}>
                <div className={styles.progressbar}>
                    <div className={styles.progressbarFilled}>

                    </div>
                </div>
                <span>0/2 Subtasks</span>
            </div>

            <div className={styles.contactPriorityContainer}>
                <div className={styles.contactIcons}>
                    <div className={styles.contactIcon}>
                        AS
                    </div>
                    <div className={styles.contactIcon}>
                        DE
                    </div>
                    <div className={styles.contactIcon}>
                        FE
                    </div>
                </div>

                <img src="./assets/icons/prio_high_colored.png" alt="" />
            </div>

        </div>
    );
}

export default Task;