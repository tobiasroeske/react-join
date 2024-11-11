import { useEffect, useState } from 'react'
import { Task } from '../interfaces/task.interface'
import { useAuthContext } from '../authProvider'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'

/**
 * Custom hook to fetch tasks from Firestore for the authenticated user.
 *
 * @returns {Task[]} The list of tasks for the authenticated user.
 */
function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { user, loading } = useAuthContext()

  /**
   * Effect to fetch tasks from Firestore when the user is authenticated.
   *
   * Sets up a Firestore query to listen for changes to the tasks collection
   * and updates the state with the fetched tasks.
   */
  useEffect(() => {
    if (!loading && user) {
      const q = query(
        collection(firestore, 'tasks'),
        where('creatorId', '==', user.uid)
      )
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasks: Task[] = []
        querySnapshot.forEach((doc) => {
          tasks.push({ ...doc.data() } as Task)
        })
        setTasks(tasks)
      })
      return () => unsubscribe()
    }
  }, [loading, user])

  return tasks
}

export default useTasks
