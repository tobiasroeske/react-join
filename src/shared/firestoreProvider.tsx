import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext } from "react";
import { firestore } from "../firebaseConfig";
import { UserCredential } from "firebase/auth";


interface User {
    name: string;
    id: string;
    email: string;
}

interface FirestoreContextType {
    addUser: (userId: string, userCred: UserCredential) => Promise<void>
    updateUser: (userId: string, user: {}) => Promise<void>
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
            console.log(error);
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
        updateUser
    }

    return (
        <FirestoreContext.Provider value={firestoreValue}>
            {children}
        </FirestoreContext.Provider>
    )
    
}

export default FirestoreProvider;