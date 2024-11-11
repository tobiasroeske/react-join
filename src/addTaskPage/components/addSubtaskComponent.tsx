import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from '../addTaskPage.module.css'

type AddSubtaskProps = {
  subtasks: Subtask[]
  setSubtasks: (subtasks: Subtask[]) => void
}

type Subtask = {
  id: string
  title: string
  completed: boolean
}

function AddSubtask({ subtasks, setSubtasks }: AddSubtaskProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [editSubtaskValue, setEditSubtaskValue] = useState<string>('')
  const [inputSelected, setInputSelected] = useState<boolean>(false)
  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null)

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

  function handleEditSubtask(id: string) {
    setEditingSubtaskId(id)
    const subtask = subtasks.find((subtask) => subtask.id === id)
    if (subtask) {
      setEditSubtaskValue(subtask.title)
    }
  }

  function handleSubtaskInput(event: React.ChangeEvent<HTMLInputElement>) {
    setEditSubtaskValue(event.target.value)
  }

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

  function handleDeleteSubtask(id: string) {
    const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id)
    setSubtasks(updatedSubtasks)
    setEditingSubtaskId(null)
    setEditSubtaskValue('')
    setInputValue('')
  }

  function addSubtask() {
    if (inputValue.trim()) {
      const newSubtask: Subtask = {
        id: uuidv4(),
        title: inputValue.trim(),
        completed: false
      }
      setSubtasks([...subtasks, newSubtask])
      resetInput()
    }
  }

  useEffect(() => {
    setInputSelected(inputValue.length > 0)
  }, [inputValue])

  return (
    <>
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
    </>
  )
}

export default AddSubtask
