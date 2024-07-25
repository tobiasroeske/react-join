import { useState } from "react";
import Headline from "./headlineComponent";
import styles from "../boardPage.module.css";
import Popup from "./popupComponent";
import AddTaskForm from "../../addTaskPage/components/addTaskFormComponent";
import TaskColumn from "./taskColumnComponent";


function Board() {
    const [popupState, setPopupState] = useState<string>("to-do");
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [isTaskCreated, setIsTaskCreated] = useState<boolean>(false);

    const handlePopupStateChange = (state: string) => {
        setPopupState(state);
        togglePopupVisibility();
    };

    const togglePopupVisibility = () => {
        setIsPopupVisible((prev) => !prev);
    };

    const handleTaskCreation = () => {
        setIsTaskCreated(true);
        setTimeout(() => {
            setIsTaskCreated(false);
            togglePopupVisibility();
        }, 1500);
    };

    return (
        <div className={styles.BoardContent}>
            <Headline setPopupState={handlePopupStateChange} />
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
        <div className={styles.columnContainer}>
            <TaskColumn setPopupState={handlePopupStateChange} state={'to-do'} title={'To do'}/>
            <TaskColumn setPopupState={handlePopupStateChange} state={'in-progress'} title={'In progress'}/>
            <TaskColumn setPopupState={handlePopupStateChange} state={'await-feedback'} title={'Await feedback'}/>
            <TaskColumn setPopupState={handlePopupStateChange} state={'done'} title={'Done'}/>
        </div>

        </div>
    );
}

export default Board;
