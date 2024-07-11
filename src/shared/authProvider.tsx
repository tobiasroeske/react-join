import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential
} from "firebase/auth";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import auth from "../firebaseConfig";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    logoutUser: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export function useAuthContext() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useContext(AuthCpntex) must be used within an AuthProvider')
    }
    return authContext;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function createUser(email: string, password: string) {
        setLoading(true);
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function loginUser(email: string, password: string) {
        setLoading(true);
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logoutUser() {
        setLoading(true);
        return await signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authValue: AuthContextType = {
        createUser,
        user,
        loginUser,
        logoutUser,
        loading,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;