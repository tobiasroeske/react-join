import { useState } from 'react'
import { useDrag } from 'react-dnd'
import { Task } from '../../shared/interfaces/task.interface'
import getInitials from '../../shared/utils/getInitials'
import truncateDescription from '../../shared/utils/truncateDescription'
import styles from '../boardPage.module.css'
import classNames from 'classnames'
import checkPriority from '../../shared/utils/checkPriority'

type TaskContainerProps = {
  task: Task
  setTaskIndex: () => void
}

/**
 * TaskContainer component.
 *
 * @param {TaskContainerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function TaskContainer({ task, setTaskIndex }: TaskContainerProps) {
  const [showContacts, setShowContacts] = useState<boolean>(false)

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  /**
   * Toggles the visibility of the extra contact popup.
   */
  function toggleExtraContactPopup() {
    setShowContacts(!showContacts)
  }

  /**
   * Gets the number of completed subtasks.
   *
   * @returns {number} The number of completed subtasks.
   */
  function getCompleteSubtaskAmount() {
    const completeSubtasks = task.subtasks.filter(
      (subtask) => subtask.completed
    )
    return completeSubtasks.length
  }

  return (
    <div
      className={classNames(styles.taskContainer, {
        [styles.dragging]: isDragging
      })}
      ref={drag}
    >
      <div
        className={styles.category}
        style={
          task.category === 'Technical Task'
            ? { backgroundColor: '#1FD7C1' }
            : {}
        }
      >
        {task.category}
      </div>
      <div className={styles.titleDescription}>
        <h4>{task.title}</h4>
        <div className={styles.description}>
          {truncateDescription(task.description)}
        </div>
      </div>

      <div className={styles.subtasksProgress}>
        <div className={styles.progressbar}>
          <div
            className={styles.progressbarFilled}
            style={{
              width:
                task.subtasks.length > 0
                  ? `${(getCompleteSubtaskAmount() / task.subtasks.length) * 100}%`
                  : 0,
              backgroundColor:
                getCompleteSubtaskAmount() === task.subtasks.length
                  ? '#7AE229'
                  : undefined
            }}
          ></div>
        </div>
        <span>
          {getCompleteSubtaskAmount()}/{task.subtasks.length} Subtasks
        </span>
      </div>

      <div className={styles.contactPriorityContainer}>
        <div className={styles.contactIcons}>
          {task.assignedContacts.map(
            (contact, index) =>
              index <= 3 && (
                <div
                  key={contact.id}
                  className={styles.contactIcon}
                  style={{ backgroundColor: contact.color }}
                >
                  {getInitials(contact.name)}
                </div>
              )
          )}
          {task.assignedContacts.length > 4 && (
            <>
              <div
                className={classNames(styles.initials, styles.extra)}
                onMouseEnter={toggleExtraContactPopup}
                onMouseLeave={toggleExtraContactPopup}
              >
                +{task.assignedContacts.length - 4}
              </div>
              <div
                className={styles.extraContacts}
                style={showContacts ? { opacity: '1' } : { opacity: '' }}
              >
                {task.assignedContacts.map(
                  (contact, index) =>
                    index > 3 && (
                      <div
                        key={contact.id}
                        className={styles.initials}
                        style={{ backgroundColor: contact.color }}
                      >
                        {getInitials(contact.name)}
                      </div>
                    )
                )}
              </div>
            </>
          )}
        </div>
        <img src={checkPriority(task)} alt="priority_icon" />
      </div>
    </div>
  )
}

export default TaskContainer
