import { useState } from "react";
import Headline from "./headlineComponent";
import styles from "../boardPage.module.css";
import Popup from "./popupComponent";
import AddTaskForm from "../../addTaskPage/components/addTaskFormComponent";
import TaskColumn from "./taskColumnComponent";
import TaskDetailView from "./taskDetailViewComponent";
import { Task } from "../../shared/interfaces/task.interface";
import useTasks from "../../shared/hooks/useTasks";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from 'react-dnd';
import { useFirestoreContext } from "../../shared/firestoreProvider";

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function Board() {
    const { updateTask } = useFirestoreContext();
    const [popupState, setPopupState] = useState<string>("to-do");
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [isTaskCreated, setIsTaskCreated] = useState<boolean>(false);
    const [isTaskDetailVisible, setIsTaskDetailVisible] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>(useTasks());

    function handlePopupStateChange(state: string) {
        setPopupState(state);
        togglePopupVisibility();
    }

    function handleSearchResult(tasks: Task[]) {
        setTasks(tasks);
    }

    function togglePopupVisibility() {
        setIsPopupVisible((prev) => !prev);
    }

    function handleTaskSelection(task: Task) {
        setSelectedTask(task);
        toggleTaskDetailPreview();
    }

    function toggleTaskDetailPreview() {
        setIsTaskDetailVisible((prev) => !prev);
    }

    function handleTaskCreation() {
        setIsTaskCreated(true);
        setTimeout(() => {
            setIsTaskCreated(false);
            togglePopupVisibility();
        }, 1500);
    }

    async function handleTaskDrop(task: Task, newState: string) {
        setTasks(prevTasks => prevTasks.map(t => 
            t.id === task.id ? {...t, state: newState } : t
        ));
        await updateTask(task.id, {...task, state: newState} as Task);
    }

    return (
        <DndProvider backend={isTouchDevice() ?  TouchBackend : HTML5Backend}>
            <div className={styles.BoardContent}>
                <Headline setPopupState={handlePopupStateChange} getSearchedTasks={handleSearchResult} />
                {isPopupVisible && (
                    <Popup
                        showPopup={isPopupVisible}
                        togglePopup={togglePopupVisibility}
                        Component={AddTaskForm}
                        taskCreated={isTaskCreated}
                        componentProps={{
                            state: popupState,
                            handleSubmitActions: handleTaskCreation,
                        }}
                    />
                )}
                {isTaskDetailVisible && selectedTask && (
                    <Popup
                        showPopup={isTaskDetailVisible}
                        togglePopup={toggleTaskDetailPreview}
                        Component={TaskDetailView}
                        taskCreated={false}
                        componentProps={{
                            task: selectedTask,
                            handleTaskDetailVisability: toggleTaskDetailPreview,
                        }}
                    />
                )}
                <div className={styles.columnContainer}>
                    {['to-do', 'in-progress', 'await-feedback', 'done'].map((state, index) => (
                        <TaskColumn
                            key={state}
                            setTaskForDetailView={handleTaskSelection}
                            setPopupState={handlePopupStateChange}
                            state={state}
                            title={state.charAt(0).toUpperCase() + state.slice(1).replace('-', ' ')}
                            tasks={tasks}
                            onTaskDrop={handleTaskDrop}
                            lastColumn={index === 3}
                        />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}

export default Board;
