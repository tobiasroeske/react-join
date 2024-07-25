import styles from "../boardPage.module.css"
import AddTaskButton from "./addTaskButtonComponent";
import Task from "./taskComponent";


type TaskColumnProps = {
    title: string,
    state: string,
    setPopupState: (state: string) => void,
}

function TaskColumn({title, state, setPopupState}: TaskColumnProps) {

    return ( 
        <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
                <h3>{title}</h3>
                <AddTaskButton setPopupState={setPopupState} state={state}/>
            </div>

            <div className={styles.tasks}>
                <Task />
            </div>
        </div>
     );
}

export default TaskColumn;