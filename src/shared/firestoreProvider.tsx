/* eslint-disable @typescript-eslint/ban-types */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { createContext, ReactNode, useContext } from 'react'
import { firestore } from '../firebaseConfig'
import { UserCredential } from 'firebase/auth'
import { Contact } from './interfaces/contact.interface'
import { Task } from './interfaces/task.interface'

interface FirestoreContextType {
  addUser: (userId: string, userCred: UserCredential) => Promise<void>
  updateUser: (userId: string, user: {}) => Promise<void>
  addContact: (newContact: Contact) => Promise<void>
  editContact: (editedContact: Contact) => Promise<void>
  deleteContact: (contactId: string) => Promise<void>
  addTask: (newTask: Task) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  updateTask: (taskId: string, updatedTask: Task) => Promise<void>
}

interface FirestoreProdiverProps {
  children: ReactNode
}

export const FirestoreContext = createContext<FirestoreContextType | null>(null)
export function useFirestoreContext() {
  const firestoreContext = useContext(FirestoreContext)
  if (!firestoreContext) {
    throw new Error('There is an error with firebase')
  }
  return firestoreContext
}

/**
 * FirestoreProvider component.
 *
 * @param {FirestoreProdiverProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function FirestoreProvider({ children }: FirestoreProdiverProps) {
  /**
   * Gets a reference to a Firestore collection.
   *
   * @param {string} colName - The name of the collection.
   * @returns {CollectionReference} The collection reference.
   */
  function getRef(colName: string) {
    return collection(firestore, colName)
  }

  /**
   * Gets a reference to a Firestore document.
   *
   * @param {string} colName - The name of the collection.
   * @param {string} docId - The ID of the document.
   * @returns {DocumentReference} The document reference.
   */
  function getDocRef(colName: string, docId: string) {
    return doc(getRef(colName), docId)
  }

  /**
   * Adds a user to the Firestore database.
   *
   * @param {string} userId - The ID of the user.
   * @param {UserCredential} userCred - The user credentials.
   * @returns {Promise<void>} A promise that resolves when the user is added.
   */
  async function addUser(userId: string, userCred: UserCredential) {
    try {
      await setDoc(getDocRef('users', userId), {
        id: userId,
        name: userCred.user.displayName,
        email: userCred.user.email
      })
    } catch (error) {
      console.error('Error while adding user', error)
    }
  }

  /**
   * Adds a contact to the Firestore database.
   *
   * @param {Contact} newContact - The contact object to add.
   * @returns {Promise<void>} A promise that resolves when the contact is added.
   */
  async function addContact(newContact: Contact) {
    try {
      const response = await addDoc(getRef('contacts'), { ...newContact })
      await updateDoc(getDocRef('contacts', response.id), { id: response.id })
    } catch (error) {
      console.error('Error while creating contact', error)
    }
  }

  /**
   * Adds a task to the Firestore database.
   *
   * @param {Task} newTask - The task object to add.
   * @returns {Promise<void>} A promise that resolves when the task is added.
   */
  async function addTask(newTask: Task) {
    try {
      const response = await addDoc(getRef('tasks'), { ...newTask })
      await updateDoc(getDocRef('tasks', response.id), { id: response.id })
    } catch (error) {
      console.error('Error while adding task', error)
    }
  }

  /**
   * Edits a contact in the Firestore database.
   *
   * @param {Contact} editedContact - The contact object with updated information.
   * @returns {Promise<void>} A promise that resolves when the contact is updated.
   */
  async function editContact(editedContact: Contact) {
    try {
      await updateDoc(getDocRef('contacts', editedContact.id), {
        ...editedContact
      })
    } catch (error) {
      console.error('Error while updating contact', error)
    }
  }

  /**
   * Deletes a contact from the Firestore database.
   *
   * @param {string} contactId - The ID of the contact to delete.
   * @returns {Promise<void>} A promise that resolves when the contact is deleted.
   */
  async function deleteContact(contactId: string) {
    try {
      await deleteDoc(getDocRef('contacts', contactId))
    } catch (error) {
      console.error('Error while deleting contact', error)
    }
  }

  /**
   * Deletes a task from the Firestore database.
   *
   * @param {string} taskId - The ID of the task to delete.
   * @returns {Promise<void>} A promise that resolves when the task is deleted.
   */
  async function deleteTask(taskId: string) {
    try {
      await deleteDoc(getDocRef('tasks', taskId))
    } catch (error) {
      console.error('Error deleting task', error)
    }
  }

  /**
   * Updates a task in the Firestore database.
   *
   * @param {string} taskId - The ID of the task to update.
   * @param {Task} updatedTask - The task object with updated information.
   * @returns {Promise<void>} A promise that resolves when the task is updated.
   */
  async function updateTask(taskId: string, updatedTask: Task) {
    try {
      await updateDoc(getDocRef('tasks', taskId), { ...updatedTask })
    } catch (error) {
      console.error('Error updating task', error)
    }
  }

  /**
   * Updates a user in the Firestore database.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {Object} user - The user object with updated information.
   * @returns {Promise<void>} A promise that resolves when the user is updated.
   */
  async function updateUser(userId: string, user: {}) {
    const userRef = getDocRef('users', userId)
    const userToAdd = setUserObject(user, userId)
    try {
      await updateDoc(userRef, userToAdd)
    } catch (error) {
      console.log(error)
    }
  }

  function setUserObject(obj: any, id: string) {
    return {
      id: id || '',
      name: obj.displayName || '',
      email: obj.email || ''
    }
  }

  const firestoreValue: FirestoreContextType = {
    addUser,
    updateUser,
    addContact,
    editContact,
    deleteContact,
    addTask,
    deleteTask,
    updateTask
  }

  return (
    <FirestoreContext.Provider value={firestoreValue}>
      {children}
    </FirestoreContext.Provider>
  )
}

export default FirestoreProvider
