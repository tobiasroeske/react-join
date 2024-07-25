import AddTaskForm from "./addTaskFormComponent";
import styles from '../addTaskPage.module.css';
import TaskCreated from "./taskCreated";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddTask() {
    const [taskCreated, setTaskCreated] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleSumit() {
        setTaskCreated(true);
        setTimeout(() => navigate('/board'), 1500)
    }


    return (
        <div className={styles.addTaskContent}> 
            <h1 className={styles.headline}>Add Task</h1>
            <AddTaskForm handleSubmitActions={handleSumit} state={'to-do'} />
            <TaskCreated taskCreated={taskCreated} />
        </div>

    );
}

export default AddTask;