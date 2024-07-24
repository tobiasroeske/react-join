import styles from '../addTaskPage.module.css';

type TaskCreatedProps = {
    taskCreated: boolean
}

function TaskCreated({taskCreated}: TaskCreatedProps) {
    return (
        <div className={styles.taskCreated} style={taskCreated ? {'top': '50%'}: {}}>
            Task added to board
            <img src="./assets/icons/board.png" alt="" />
        </div>);
}

export default TaskCreated;