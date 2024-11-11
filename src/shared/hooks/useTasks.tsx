import { useEffect, useState } from 'react'
import { Task } from '../interfaces/task.interface'
import { useAuthContext } from '../authProvider'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { user, loading } = useAuthContext()

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
