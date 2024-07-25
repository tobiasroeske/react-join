import styles from "../boardPage.module.css"

type AddTaskButtonProps = {
    state: string,
    setPopupState: (state: string) => void
}

function AddTaskButton({state, setPopupState}: AddTaskButtonProps) {
    

    function handleSetTaskState() {
        setPopupState(state)
    }

    return ( 
        <button className={styles.addTaskIcon} onClick={handleSetTaskState}>
            <img src="./assets/icons/board_plus.svg" alt="" />
        </button>
     );
}

export default AddTaskButton;