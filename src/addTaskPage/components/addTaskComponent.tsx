import AddTaskForm from "./addTaskFormComponent";
import styles from '../addTaskPage.module.css';
function AddTask() {
    return (
        <>
            <h1 className={styles.headline}>Add Task</h1>
            <AddTaskForm />
        </>

    );
}

export default AddTask;