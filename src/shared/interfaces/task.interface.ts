import { Contact } from './contact.interface'

type Subtask = {
  id: string
  title: string
  completed: boolean
}

export interface Task {
  creatorId: string
  title: string
  description: string
  dueDate: number
  assignedContacts: Contact[]
  priority: string
  category: string | 'Technical Task' | 'User Story'
  subtasks: Subtask[]
  state: 'to-do' | 'in-progress' | 'await-feedback' | 'done' | string
  id: string
}
