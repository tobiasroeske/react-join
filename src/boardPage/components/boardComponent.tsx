import React, { useState, useCallback } from 'react'
import { Task } from '../../shared/interfaces/task.interface'
import useTasks from '../../shared/hooks/useTasks'
import styles from './boardComponent.module.css'
import Headline from './headlineComponent'
import Popup from './popupComponent'
import AddTaskForm from '../../addTaskPage/components/addTaskFormComponent'
import TaskColumn from './taskColumnComponent'
import TaskDetailView from './taskDetailViewComponent'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { useFirestoreContext } from '../../shared/firestoreProvider'

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * BoardComponent component.
 *
 * @returns {JSX.Element} The rendered component.
 */
function BoardComponent() {
  const { updateTask } = useFirestoreContext()
  const [popupState, setPopupState] = useState<string>('to-do')
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)
  const [isTaskCreated, setIsTaskCreated] = useState<boolean>(false)
  const [isTaskDetailVisible, setIsTaskDetailVisible] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>(useTasks())

  /**
   * Handles the state change of the popup.
   *
   * @param {string} state - The new state of the popup.
   */
  function handlePopupStateChange(state: string) {
    setPopupState(state)
    togglePopupVisibility()
  }

  /**
   * Handles the search result and updates the tasks.
   *
   * @param {Task[]} tasks - The search result tasks.
   */
  const handleSearchResult = useCallback((tasks: Task[]) => {
    setTasks(tasks)
  }, [])

  /**
   * Toggles the visibility of the popup.
   */
  function togglePopupVisibility() {
    setIsPopupVisible((prev) => !prev)
  }

  /**
   * Handles the selection of a task.
   *
   * @param {Task} task - The selected task.
   */
  function handleTaskSelection(task: Task) {
    setSelectedTask(task)
    toggleTaskDetailPreview()
  }

  /**
   * Toggles the visibility of the task detail preview.
   */
  function toggleTaskDetailPreview() {
    setIsTaskDetailVisible((prev) => !prev)
  }

  /**
   * Handles the creation of a task.
   */
  function handleTaskCreation() {
    setIsTaskCreated(true)
    setTimeout(() => {
      setIsTaskCreated(false)
      togglePopupVisibility()
    }, 1500)
  }

  async function handleTaskDrop(task: Task, newState: string) {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, state: newState } : t))
    )
    await updateTask(task.id, { ...task, state: newState } as Task)
  }

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div className={styles.BoardContent}>
        <Headline
          setPopupState={handlePopupStateChange}
          getSearchedTasks={handleSearchResult}
        />
        {isPopupVisible && (
          <Popup
            showPopup={isPopupVisible}
            togglePopup={togglePopupVisibility}
            Component={AddTaskForm}
            taskCreated={isTaskCreated}
            componentProps={{
              state: popupState,
              handleSubmitActions: handleTaskCreation
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
              handleTaskDetailVisability: toggleTaskDetailPreview
            }}
          />
        )}
        <div className={styles.columnContainer}>
          {['to-do', 'in-progress', 'await-feedback', 'done'].map(
            (state, index) => (
              <TaskColumn
                key={state}
                setTaskForDetailView={handleTaskSelection}
                setPopupState={handlePopupStateChange}
                state={state}
                title={
                  state.charAt(0).toUpperCase() +
                  state.slice(1).replace('-', ' ')
                }
                tasks={tasks}
                onTaskDrop={handleTaskDrop}
                lastColumn={index === 3}
              />
            )
          )}
        </div>
      </div>
    </DndProvider>
  )
}

export default BoardComponent
