import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth'
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from 'react'
import auth from '../firebaseConfig'

interface AuthContextType {
  user: User | null
  loading: boolean
  createUser: (email: string, password: string) => Promise<UserCredential>
  loginUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>
  logoutUser: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Custom hook to use the AuthContext.
 *
 * @returns {AuthContextType} The AuthContext value.
 * @throws Will throw an error if used outside of AuthProvider.
 */
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

/**
 * AuthProvider component.
 *
 * @param {AuthProviderProps} props - The props for the component.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  /**
   * Registers a new user with email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<UserCredential>} A promise that resolves with the user credentials if successful.
   */
  async function createUser(
    email: string,
    password: string
  ): Promise<UserCredential> {
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(response.user)
      return response
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logs in a user with email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<UserCredential | undefined>} A promise that resolves with the user credentials if successful.
   */
  async function loginUser(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      return response
    } catch (error) {
      console.error('Error during login', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logs out the current user.
   *
   * @returns {Promise<void>} A promise that resolves when the user is logged out.
   */
  async function logoutUser(): Promise<void> {
    setLoading(true)
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out: ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Effect to set up an authentication state observer and get user data.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, createUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
