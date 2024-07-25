import styles from '../boardPage.module.css';
import SearchInput from './searchInputComponent';

type HeadlineProps = {
    setPopupState: (state: string) => void,
}

function Headline({setPopupState}: HeadlineProps) {

    function handlePopupState() {
        setPopupState('to-do');
    }
    return (
        <div className={styles.headline}>
            <h1>Board</h1>
            <div className={styles.searchContainer}>
                <SearchInput />
                <button className={styles.addTaskBtn} onClick={handlePopupState}>Add task <img src="./assets/icons/addTask_board.png" alt="" /></button>
            </div>
        </div>
    );
}

export default Headline;