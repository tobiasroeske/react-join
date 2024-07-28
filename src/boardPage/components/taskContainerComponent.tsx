import { useState } from "react";
import { Task } from "../../shared/interfaces/task.interface";
import getInitials from "../../shared/utils/getInitials";
import truncateDescription from "../../shared/utils/truncateDescription";
import styles from "../boardPage.module.css"
import classNames from "classnames";
import checkPriority from "../../shared/utils/checkPriority";

type TaskContainerProps = {
    task: Task,
}

function TaskContainer({ task }: TaskContainerProps) {
    const [showContacts, setShowContacts] = useState<boolean>(false);

    function toggleExtraContactPopup() {
        setShowContacts(!showContacts)
    }
    return (
        <div className={styles.task}>
            <div className={styles.category} style={task.category === 'Technical Task' ? {backgroundColor: '#1FD7C1'} : {}}>
                {task.category}
            </div>
            <div className={styles.titleDescription}>
                <h4>{task.title}</h4>
                <div className={styles.description}>
                    {truncateDescription(task.description)}
                </div>
            </div>


            <div className={styles.subtasksProgress}>
                <div className={styles.progressbar}>
                    <div className={styles.progressbarFilled}>

                    </div>
                </div>
                <span>0/{task.subtasks.length} Subtasks</span>
            </div>

            <div className={styles.contactPriorityContainer}>
                <div className={styles.contactIcons}>
                    {task.assignedContacts.map((contact, index) =>
                        index <= 3 && ( 
                        <div key={contact.id} className={styles.contactIcon} style={{backgroundColor: contact.color}}>
                            {getInitials(contact.name)}
                        </div>
                    ))}

                    {task.assignedContacts.length > 4 && (
                        <>
                            <div className={classNames(styles.initials, styles.extra)} onMouseEnter={toggleExtraContactPopup} onMouseLeave={toggleExtraContactPopup}>
                                +{task.assignedContacts.length - 4}
                            </div>
                            <div className={styles.extraContacts} style={showContacts ? {opacity: '1'}: {opacity: ''}}>
                                {task.assignedContacts.map((contact, index) =>
                                    index > 3 && (
                                        <div key={contact.id} className={styles.initials} style={{ backgroundColor: contact.color }}>
                                            {getInitials(contact.name)}
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </div>
                <img src={checkPriority(task)} alt="priority_icon"/>
            </div>

        </div>
    );
}

export default TaskContainer;