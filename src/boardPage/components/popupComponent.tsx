import styles from "../boardPage.module.css";
import React, { useEffect, useState } from "react";
import TaskCreated from "../../addTaskPage/components/taskCreated";

type PopupProps = {
    Component: React.ComponentType<any>,
    componentProps: AddTaskFormProps,
    togglePopup: () => void,
    showPopup: boolean,
    taskCreated: boolean
}

type AddTaskFormProps = {
    state: string,
    handleSubmitActions:() => void
}

function Popup({ Component, componentProps, togglePopup, showPopup, taskCreated }: PopupProps) {
    const [isSlideIn, setIsSlideIn] = useState<boolean>(false);

    useEffect(() => {
        if (showPopup) {
            setIsSlideIn(true)
        } else {
            setIsSlideIn(false)
        }
    },[showPopup])


    function handleShowPopup() {
        togglePopup();
    }

    return (
        <div className="popup">
            <div className={styles.popupContent} style={isSlideIn ? {transform: 'translateX(0)'} : {}}>
                <Component {...componentProps} />
                <img src="./assets/icons/board_close.png" alt="" 
                className={styles.closeIcon} 
                onClick={handleShowPopup}
                />
            </div>
            <TaskCreated taskCreated={taskCreated} />
            
        </div>
    );
}

export default Popup;