import { Contact } from "./contact.interface";

export interface Task {
    creatorId: string;
    title: string;
    description: string;
    duteDate: number;
    assignedContacts: Contact[];
    priority: string;
    category: 'Technical Task' | 'User Story';
    subtasks: string [];
}