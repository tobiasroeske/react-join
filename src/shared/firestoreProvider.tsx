import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext } from "react";
import { firestore } from "../firebaseConfig";
import { UserCredential } from "firebase/auth";
import { Contact } from "./interfaces/contact.interface";
import { Task } from "./interfaces/task.interface";

interface FirestoreContextType {
    addUser: (userId: string, userCred: UserCredential) => Promise<void>
    updateUser: (userId: string, user: {}) => Promise<void>
    addContact: (newContact: Contact) => Promise<void>
    editContact: (editedContact: Contact) => Promise<void>
    deleteContact: (contactId: string) => Promise<void>
    addTask: (newTask: Task) => Promise<void>
    deleteTask: (taskId: string) => Promise<void>
    updateTask: (taskId:string, updatedTask: Task) => Promise<void>
}

interface FirestoreProdiverProps {
    children: ReactNode
}

export const FirestoreContext = createContext<FirestoreContextType | null>(null);
export function useFirestoreContext() {
    const firestoreContext = useContext(FirestoreContext);
    if (!firestoreContext) {
        throw new Error('There is an error with firebase')
    }
    return firestoreContext;
}

function FirestoreProvider({ children }: FirestoreProdiverProps) {

    function getRef(colName: string) {
        return collection(firestore, colName)
    }

    function getDocRef(colNane: string, docId: string) {
        return doc(getRef(colNane), docId);
    }

    async function addUser(userId: string, userCred: UserCredential) {
        try {
            await setDoc(getDocRef('users', userId), { id: userId, name: userCred.user.displayName, email: userCred.user.email });
        } catch (error) {
            console.error('Error while adding user', error);
        }
    }

    async function addContact(newContact: Contact) {
        try {
            let  response = await addDoc(getRef('contacts'), {...newContact})
            await updateDoc(getDocRef('contacts', response.id), {id: response.id});
        } catch (error) {
            console.error('Error while creating contact', error)
        }
    }

    async function addTask(newTask: Task) {
        try {
            let response = await addDoc(getRef('tasks'), {...newTask});
            await updateDoc(getDocRef('tasks', response.id), {id: response.id});
        } catch (error) {
            console.error('Error while adding task', error)
        }
    }

    async function editContact(editedContact: Contact) {
        try {
            await updateDoc(getDocRef('contacts', editedContact.id), {...editedContact})
        } catch (error) {
            console.error('Error while updating contact', error)
        }
    }

    async function deleteContact(contactId: string) {
        try {
            await deleteDoc(getDocRef('contacts', contactId))
        } catch (error) {
            console.error('Error while deleting contact', error)
        }
    }

    async function deleteTask(taskId: string) {
        try {
            await deleteDoc(getDocRef('tasks', taskId))
        } catch (error) {
            console.error('Error deleting task', error)
        }
    }

    async function updateTask(taskId: string, updatedTask: Task) {
        try {
            await updateDoc(getDocRef('tasks', taskId), {...updatedTask})
        } catch (error) {
            console.error('Error updating task', error)
        }
    }

    async function updateUser(userId: string, user: {}) {
        let userRef = getDocRef('users', userId);
        let userToAdd = setUserObject(user, userId);
        try {
            await updateDoc(userRef, userToAdd);
        } catch (error) {
            console.log(error)
        }
    }

    function setUserObject(obj: any, id: string) {
        return {
            id: id || '',
            name: obj.displayName || '',
            email: obj.email || '',
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
        updateTask,
    }

    return (
        <FirestoreContext.Provider value={firestoreValue}>
            {children}
        </FirestoreContext.Provider>
    )
    
}

export default FirestoreProvider;