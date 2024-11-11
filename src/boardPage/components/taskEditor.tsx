import { SubmitHandler, useForm } from 'react-hook-form'
import { Task } from '../../shared/interfaces/task.interface'
import styles from '../boardPage.module.css'
import PrioButton from '../../addTaskPage/components/prioButtonComponent'
import { useEffect, useState } from 'react'
import AddContactSelect from '../../addTaskPage/components/addContactSelectComponent'
import { Contact } from '../../shared/interfaces/contact.interface'
import AddSubtask from '../../addTaskPage/components/addSubtaskComponent'
import classNames from 'classnames'
import { useFirestoreContext } from '../../shared/firestoreProvider'

type TaskEditorProps = {
  task: Task
  handleUpdate: (newTask: Task) => void
}

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

  useEffect(() => {
    if (task) {
      setValue('title', task.title)
      setValue('description', task.description)
      setValue('dueDate', new Date(task.dueDate).toISOString().split('T')[0])
    }
  }, [task, setValue])

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (task) {
      const updatedTask = getUpdatedTaskObject(data)
      await updateTask(updatedTask.id, updatedTask)
      handleUpdate(updatedTask)
    }
  }

  function getUpdatedTaskObject(data: FormFields) {
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

  function selectPriority(prio: string) {
    setPriority(prio)
  }

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
