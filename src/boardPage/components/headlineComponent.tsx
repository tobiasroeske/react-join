import { Link } from 'react-router-dom'
import { Task } from '../../shared/interfaces/task.interface'
import styles from '../boardPage.module.css'
import SearchInput from './searchInputComponent'

type HeadlineProps = {
  setPopupState: (state: string) => void
  getSearchedTasks: (tasks: Task[]) => void
}

function Headline({ setPopupState, getSearchedTasks }: HeadlineProps) {
  function handlePopupState() {
    setPopupState('to-do')
  }
  return (
    <div className={styles.headline}>
      <h1>Board</h1>
      <div className={styles.headlineWrapper}>
        <h1>Board</h1>
        <Link to="/add-task" className={styles.addTaskMobile}>
          <img src="./assets/icons/addTask_board.png" alt="" />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <SearchInput getSearchedTasks={getSearchedTasks} />
        <button className={styles.addTaskBtn} onClick={handlePopupState}>
          Add task <img src="./assets/icons/addTask_board.png" alt="" />
        </button>
      </div>
    </div>
  )
}

export default Headline
