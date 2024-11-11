import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Task } from '../../shared/interfaces/task.interface'
import { Contact } from '../../shared/interfaces/contact.interface'
import { useFirestoreContext } from '../../shared/firestoreProvider'
import styles from './taskEditor.module.css'
import PrioButton from '../../addTaskPage/components/prioButtonComponent'
import AddContactSelect from '../../addTaskPage/components/addContactSelectComponent'
import AddSubtask from '../../addTaskPage/components/addSubtaskComponent'
import classNames from 'classnames'

type FormFields = {
  title: string
  description: string
  dueDate: string | number
}

type Subtask = {
  id: string
  title: string
  completed: boolean
}

type TaskEditorProps = {
  task: Task
  handleUpdate: (task: Task) => void
}

/**
 * TaskEditor component.
 *
 * @param {TaskEditorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function TaskEditor({ task, handleUpdate }: TaskEditorProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>()
  const { updateTask } = useFirestoreContext()
  const [priority, setPriority] = useState<string>(task.priority)
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>(
    task.assignedContacts
  )
  const [showContactDropdown, setShowContactDropdown] = useState<boolean>(false)
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks)
  const today = new Date().toISOString().split('T')[0]

  /**
   * Effect to set the form values when the task changes.
   */
  useEffect(() => {
    if (task) {
      setValue('title', task.title)
      setValue('description', task.description)
      setValue('dueDate', new Date(task.dueDate).toISOString().split('T')[0])
    }
  }, [task, setValue])

  /**
   * Handles the form submission to update a task.
   *
   * @param {FormFields} data - The form data.
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (task) {
      const updatedTask = getUpdatedTaskObject(data)
      await updateTask(updatedTask.id, updatedTask)
      handleUpdate(updatedTask)
    }
  }

  /**
   * Gets the updated task object based on the form data.
   *
   * @param {FormFields} data - The form data.
   * @returns {Task} The updated task object.
   */
  function getUpdatedTaskObject(data: FormFields): Task {
    return {
      ...task,
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate).getTime(),
      priority: priority,
      assignedContacts: selectedContacts,
      subtasks: subtasks
    }
  }

  /**
   * Selects the priority for the task.
   *
   * @param {string} prio - The priority to select.
   */
  function selectPriority(prio: string) {
    setPriority(prio)
  }

  /**
   * Handles the selection of a contact.
   *
   * @param {Contact} selectedContact - The selected contact.
   * @param {React.MouseEvent} e - The mouse event.
   */
  function handleContactSelect(selectedContact: Contact, e: React.MouseEvent) {
    e.stopPropagation()
    setSelectedContacts((prevContacts) => {
      const contactIndex = prevContacts.findIndex(
        (contact) => contact.id === selectedContact.id
      )
      return contactIndex === -1
        ? [...prevContacts, selectedContact]
        : prevContacts.filter((contact) => contact.id !== selectedContact.id)
    })
  }

  return (
    <div className={styles.taskEditor}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formEditor}>
        <div className="inputContainer">
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Please enter at least 3 characters'
              }
            })}
            type="text"
            id="title"
            name="title"
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        <div className="inputContainer">
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            {...register('description')}
            name="description"
            id="description"
            placeholder="Enter a description"
            rows={4}
          ></textarea>
        </div>

        <div className="inputContainer">
          <label htmlFor="dueDate" className={styles.label}>
            Due date
          </label>
          <input
            {...register('dueDate', {
              required: 'Due date is required'
            })}
            type="date"
            id="dueDate"
            name="dueDate"
            min={today}
          />
          {errors.dueDate && (
            <span className="error-message">{errors.dueDate.message}</span>
          )}
        </div>

        <div className={styles.prioContainer}>
          <b>Priority</b>
          <div className={styles.prioBtnContainer}>
            <PrioButton
              imgPath={'/assets/icons/prio_high.svg'}
              text={'Urgent'}
              isSelected={priority === 'Urgent'}
              classOnSelect={'selectedHigh'}
              onSelect={selectPriority}
            />
            <PrioButton
              imgPath={'/assets/icons/prio_medium.svg'}
              text={'Medium'}
              isSelected={priority === 'Medium'}
              classOnSelect={'selectedMedium'}
              onSelect={selectPriority}
            />
            <PrioButton
              imgPath={'/assets/icons/prio_low.svg'}
              text={'Low'}
              isSelected={priority === 'Low'}
              classOnSelect={'selectedLow'}
              onSelect={selectPriority}
            />
          </div>
        </div>

        <AddContactSelect
          selectedContacts={selectedContacts}
          handleContactSelect={handleContactSelect}
          showDropdown={showContactDropdown}
          setShowDropdown={setShowContactDropdown}
        />

        <AddSubtask subtasks={subtasks} setSubtasks={setSubtasks} />

        <button
          type="submit"
          className={classNames(styles.submitBtn, {
            [styles.disabled]: isSubmitting
          })}
          disabled={isSubmitting}
        >
          Ok
          <img src="./assets/icons/check.svg" alt="" />
        </button>
      </form>
    </div>
  )
}

export default TaskEditor
