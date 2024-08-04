import { useEffect, useState } from "react"
import styles from "../boardPage.module.css"
import { useNavigate } from "react-router-dom"

type AddTaskButtonProps = {
    state: string,
    setPopupState: (state: string) => void
}

function AddTaskButton({state, setPopupState}: AddTaskButtonProps) {
    const[isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 740)
    const navigate = useNavigate();

    function handleTaskButtonClick() {
        isMobile ? navigate('/add-task') : setPopupState(state)
    }

    function checkScreenSize() {
        window.innerWidth <= 740 ? setIsMobile(true) : setIsMobile(false);
    }

    useEffect(() => {
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [])

    return ( 
        <button className={styles.addTaskIcon} onClick={handleTaskButtonClick}>
            <img src="./assets/icons/board_plus.svg" alt="" />
        </button>
     );
}

export default AddTaskButton;