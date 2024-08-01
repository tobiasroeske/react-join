import { ChangeEvent, useEffect, useState } from "react";
import { useFirestoreContext } from "../../shared/firestoreProvider";
import { Task } from "../../shared/interfaces/task.interface";
import checkPriority from "../../shared/utils/checkPriority";
import { formatDate } from "../../shared/utils/formateDate";
import getInitials from "../../shared/utils/getInitials";
import styles from "../boardPage.module.css"
import TaskEditor from "./taskEditor";

type TaskDetailViewProps = {
    task: Task,
    handleTaskDetailVisability: () => void,
}

function TaskDetailView({ task, handleTaskDetailVisability }: TaskDetailViewProps) {
    const { deleteTask, updateTask } = useFirestoreContext();
    const [subtasks, setSubtasks] = useState(task.subtasks);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [ taskUpdate, setTaskUpdate ] = useState<Task>(task);

    async function handleDeleteTask(taskId: string) {
        await deleteTask(taskId);
        handleTaskDetailVisability();
    }

    function handleTaskUpdate(newTask: Task) {
        setIsEditing(false);
        setTaskUpdate(newTask)
    }

    function openTaskEditor() {
        setIsEditing(true);
    }

    function handleCheckboxChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].completed = event.target.checked;
        setSubtasks(updatedSubtasks);
    }

    useEffect(() => {
        updateTask(taskUpdate.id, taskUpdate)
    }, [subtasks, taskUpdate.subtasks, taskUpdate, updateTask])

    if (isEditing) {
        return <TaskEditor task={taskUpdate} handleUpdate={handleTaskUpdate}/>
    } else {
        return (
            <div className={styles.taskDetailView}>
                <div className={styles.category} style={task.category === 'Technical Task' ? { backgroundColor: '#1FD7C1' } : {}}>
                    {taskUpdate.category}
                </div>
                <h2 className={styles.taskDetailHeadline} style={task.title.length >= 32 ? { fontSize: '32px' } : {}}>
                    {taskUpdate.title}
                </h2>
                <span>{taskUpdate.description}</span>
                <div className={styles.dateAndPrioContainer}>
                    Due date:
                    <span>{formatDate(taskUpdate.dueDate)}</span>
                </div>
                <div className={styles.dateAndPrioContainer}>
                    Priority:
                    <span>{taskUpdate.priority} <img src={checkPriority(taskUpdate)} alt="" /></span>
                </div>

                <div className={styles.assignedContactsContainer}>
                    <span>Assigned To:</span>
                    {taskUpdate.assignedContacts.length > 0 &&
                        <div className={styles.contactsContainer}>
                            {taskUpdate.assignedContacts.map(contact =>
                                <div key={contact.id} className={styles.contactBox}>
                                    <span className={styles.initials} style={{ backgroundColor: contact.color }}>
                                        {getInitials(contact.name)}
                                    </span>
                                    <span className={styles.contactName}>{contact.name}</span>
                                </div>

                            )}
                        </div>
                    }
                </div>

                <div className={styles.subtaskContainer}>
                    Subtasks
                    {taskUpdate.subtasks.length === 0 &&
                        <span>No subtasks</span>
                    }
                    {taskUpdate.subtasks.map((subtask, index) =>
                        <div key={index} className={styles.subtaskBox}>
                            <input type="checkbox"
                                id={`${subtask.title}${index}`}
                                defaultChecked={subtask.completed}
                                onChange={(event) => handleCheckboxChange(index, event)}
                            />
                            <label htmlFor={`${subtask.title}${index}`}>{subtask.title}</label>
                        </div>

                    )}
                </div>

                <div className={styles.actionContainer}>
                    <div className={styles.actionButton} onClick={() => handleDeleteTask(task.id)}>
                        <img src="./assets/icons/delete.svg" alt="delete icon" />
                        Delete
                    </div>
                    <div className={styles.actionButton} onClick={openTaskEditor}>
                        <img src="./assets/icons/edit.png" alt="" />
                        Edit
                    </div>
                </div>

            </div>
        )
    }
}

export default TaskDetailView;