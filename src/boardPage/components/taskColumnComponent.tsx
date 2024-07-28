import { useEffect, useState } from "react";
import useTasks from "../../shared/hooks/useTasks";
import styles from "../boardPage.module.css"
import AddTaskButton from "./addTaskButtonComponent";
import { Task } from "../../shared/interfaces/task.interface";
import TaskContainer from "./taskContainerComponent";


type TaskColumnProps = {
    title: string,
    state: string,
    setPopupState: (state: string) => void,
}

function TaskColumn({ title, state, setPopupState }: TaskColumnProps) {
    const [loadedTasks, setLoadedTasks] = useState<Task[]>([])
    let tasks = useTasks();

    useEffect(() => {
        let filteredTasks = tasks.filter(task => task.state === state);
        setLoadedTasks(filteredTasks);

    }, [tasks, state])

    return (
        <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
                <h3>{title}</h3>
                <AddTaskButton setPopupState={setPopupState} state={state} />
            </div>

            <div className={styles.tasks}>
                {loadedTasks.map((task, index) => 
                    <TaskContainer key={task.id || index} task={task} />
                )}

            </div>
        </div>
    );
}

export default TaskColumn;