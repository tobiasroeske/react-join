import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './addSubtaskComponent.module.css'

type Subtask = {
  id: string
  title: string
  completed: boolean
}

type AddSubtaskProps = {
  subtasks: Subtask[]
  setSubtasks: (subtasks: Subtask[]) => void
}

/**
 * AddSubtask component.
 *
 * @param {AddSubtaskProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function AddSubtask({ subtasks, setSubtasks }: AddSubtaskProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [editSubtaskValue, setEditSubtaskValue] = useState<string>('')
  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null)
  const [inputSelected, setInputSelected] = useState<boolean>(false)

  /**
   * Handles the form submission to add a new subtask.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  function handleAddSubtask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addSubtask()
  }

  /**
   * Adds a new subtask to the list.
   */
  function addSubtask() {
    if (inputValue.trim() === '') return
    const newSubtask = {
      id: uuidv4(),
      title: inputValue.trim(),
      completed: false
    }
    setSubtasks([...subtasks, newSubtask])
    setInputValue('')
  }

  /**
   * Handles the edit of a subtask.
   *
   * @param {string} id - The ID of the subtask to edit.
   */
  function handleEditSubtask(id: string) {
    setEditingSubtaskId(id)
    const subtask = subtasks.find((subtask) => subtask.id === id)
    if (subtask) {
      setEditSubtaskValue(subtask.title)
    }
  }

  /**
   * Handles input change for the subtask.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  function handleSubtaskInput(event: React.ChangeEvent<HTMLInputElement>) {
    setEditSubtaskValue(event.target.value)
  }

  /**
   * Handles saving the edited subtask.
   *
   * @param {string} id - The ID of the subtask to save.
   */
  function handleSaveEdit(id: string) {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id
        ? { ...subtask, title: editSubtaskValue.trim() }
        : subtask
    )
    setSubtasks(updatedSubtasks)
    setEditingSubtaskId(null)
    setEditSubtaskValue('')
  }

  /**
   * Handles deleting a subtask.
   *
   * @param {string} id - The ID of the subtask to delete.
   */
  function handleDeleteSubtask(id: string) {
    const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id)
    setSubtasks(updatedSubtasks)
    setEditingSubtaskId(null)
    setEditSubtaskValue('')
    setInputValue('')
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }

  function resetInput() {
    setInputValue('')
  }

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      addSubtask()
    }
  }

  useEffect(() => {
    setInputSelected(inputValue.length > 0)
  }, [inputValue])

  return (
    <div className={styles.addSubtask}>
      <div className="inputContainer">
        <label htmlFor="subtask" className={styles.label}>
          Subtasks
        </label>
        <input
          type="text"
          name="subtask"
          id="subtask"
          placeholder="Add new subtask"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
        {inputSelected ? (
          <div className={styles.addIconContainer}>
            <img
              src="./assets/icons/addTask_close.svg"
              alt="Reset"
              onClick={resetInput}
              className={styles.icon}
            />
            <span className={styles.seperatorSmall}></span>
            <img
              src="./assets/icons/addTask_check.svg"
              alt="Add"
              onClick={addSubtask}
              className={styles.icon}
            />
          </div>
        ) : (
          <img
            className={styles.addIcon}
            src="./assets/icons/add.svg"
            alt="Add Subtask"
          />
        )}
      </div>
      {subtasks.length > 0 && (
        <div className={styles.subtaskContainer}>
          <ul className={styles.styledList}>
            {subtasks.map((subtask) =>
              editingSubtaskId === subtask.id ? (
                <li key={subtask.id} className={styles.editingItem}>
                  <input
                    type="text"
                    value={editSubtaskValue}
                    onChange={handleSubtaskInput}
                    onBlur={() => handleSaveEdit(subtask.id)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleSaveEdit(subtask.id)
                    }
                    autoFocus
                  />
                  <div className={styles.editSubtaskContainer}>
                    <img
                      src="./assets/icons/addTask_delete.png"
                      alt="Delete"
                      className={styles.icon}
                      onClick={() => handleDeleteSubtask(subtask.id)}
                    />
                    <div className={styles.seperatorSmall}></div>
                    <img
                      src="./assets/icons/addTask_check.svg"
                      alt="Save"
                      className={styles.icon}
                      onClick={() => handleSaveEdit(subtask.id)}
                    />
                  </div>
                </li>
              ) : (
                <li
                  key={subtask.id}
                  onClick={() => handleEditSubtask(subtask.id)}
                >
                  <span className={styles.bullet}></span>
                  <span className={styles.content}>{subtask.title}</span>
                  <div className={styles.editSubtaskContainer}>
                    <img
                      src="./assets/icons/addTask_delete.png"
                      alt="Delete"
                      className={styles.icon}
                      onClick={() => handleDeleteSubtask(subtask.id)}
                    />
                    <div className={styles.seperatorSmall}></div>
                    <img
                      src="./assets/icons/addTask_check.svg"
                      alt="Edit"
                      className={styles.icon}
                    />
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AddSubtask
