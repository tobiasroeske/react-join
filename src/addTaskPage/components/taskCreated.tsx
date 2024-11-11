import classNames from 'classnames'
import styles from '../addTaskPage.module.css'

type TaskCreatedProps = {
  taskCreated: boolean
}

function TaskCreated({ taskCreated }: TaskCreatedProps) {
  return (
    <div
      className={classNames(styles.taskCreated, {
        [styles.created]: taskCreated
      })}
    >
      Task added to board
      <img src="./assets/icons/board.png" alt="" />
    </div>
  )
}

export default TaskCreated
