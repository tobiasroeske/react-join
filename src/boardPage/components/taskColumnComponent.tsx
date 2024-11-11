import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'
import styles from './taskColumnComponent.module.css'
import { Task } from '../../shared/interfaces/task.interface'
import AddTaskButton from './addTaskButtonComponent'
import TaskContainer from './taskContainerComponent'

type TaskColumnProps = {
  title: string
  state: string
  setPopupState: (state: string) => void
  setTaskForDetailView: (task: Task) => void
  tasks: Task[]
  onTaskDrop: (task: Task, state: string) => void
  lastColumn?: boolean
}

/**
 * TaskColumn component.
 *
 * @param {TaskColumnProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function TaskColumn({
  title,
  state,
  setPopupState,
  setTaskForDetailView,
  tasks,
  onTaskDrop,
  lastColumn
}: TaskColumnProps) {
  const [loadedTasks, setLoadedTasks] = useState<Task[]>([])

  /**
   * Effect to filter tasks based on their state.
   *
   * Updates the state variable `loadedTasks` with the filtered tasks.
   */
  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.state === state)
    setLoadedTasks(filteredTasks)
  }, [tasks, state])

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: Task) => {
      onTaskDrop(item, state)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div
      className={classNames(styles.taskColumn, { [styles.dragging]: isOver })}
      ref={drop}
      style={lastColumn ? { paddingBottom: '112px' } : {}}
    >
      <div className={styles.columnHeader}>
        <h3>{title}</h3>
        <AddTaskButton setPopupState={setPopupState} state={state} />
      </div>
      {loadedTasks.length === 0 && (
        <div className={styles.NoTasksContainer}>
          No tasks {state.replace('-', ' ')}
        </div>
      )}
      <div className={styles.tasks}>
        {loadedTasks.map((task, index) => (
          <TaskContainer
            key={task.id || index}
            task={task}
            setTaskIndex={() => setTaskForDetailView(task)}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn
