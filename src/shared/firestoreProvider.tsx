import { collection, doc, onSnapshot, setDoc, Unsubscribe, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { UserCredential } from "firebase/auth";

interface User {
    name: string;
    id: string;
    email: string;
}

interface FirestoreContextType {
    subUsersList: () => Unsubscribe;
    allUsers: User[];
    loading: boolean;
    addUser: (userId: string, userCred: UserCredential) => Promise<void>
    updateUser: (userId:string, user: {}) => Promise<void>
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

function FirestoreProvider({children}: FirestoreProdiverProps) {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    function getUsersRef() {
        return collection(firestore, 'users')
    }

    function getUserDocRef(userId: string) {
        return doc(getUsersRef(), userId);
    }

    async function addUser(userId: string, userCred: UserCredential) {
        try {
            await setDoc(getUserDocRef(userId), {id: userId, name: userCred.user.displayName, email: userCred.user.email});
        } catch (error) {
            console.log(error);
        }
        
    }

    async function updateUser(userId:string, user: {}) {
        let userRef = getUserDocRef(userId);
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

    useEffect(() => {
        const unsubscribe = onSnapshot(getUsersRef(), (snapshot) => {
            const users: User[] = [];
            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() } as User);
            });
            setAllUsers(users);
            setLoading(false);
            
        });

        return unsubscribe;
    }, []);

    const firestoreValue: FirestoreContextType = {
        subUsersList: () => onSnapshot(getUsersRef(), () => {}),
        allUsers,
        loading,
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