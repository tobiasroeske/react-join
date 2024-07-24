import AddTaskForm from "./addTaskFormComponent";
import styles from '../addTaskPage.module.css';
import TaskCreated from "./taskCreated";
import { useState } from "react";
function AddTask() {
    const [taskCreated, setTaskCreated] = useState<boolean>(false);

    function handleTaskCreated() {
        setTaskCreated(true);
    }


    return (
        <div className={styles.addTaskContent}> 
            <h1 className={styles.headline}>Add Task</h1>
            <AddTaskForm taskCreated={handleTaskCreated} state={'to-do'} />
            <TaskCreated taskCreated={taskCreated} />
        </div>

    );
}

export default AddTask;