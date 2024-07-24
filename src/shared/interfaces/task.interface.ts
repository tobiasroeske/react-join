import { Contact } from "./contact.interface";

export interface Task {
    creatorId: string;
    title: string;
    description: string;
    dueDate: number;
    assignedContacts: Contact[];
    priority: string;
    category: string | 'Technical Task' | 'User Story';
    subtasks: string [];
    state: 'to-do' | 'in-progress' | 'await-feedback' | 'done'
}