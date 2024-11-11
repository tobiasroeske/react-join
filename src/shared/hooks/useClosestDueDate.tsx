import { useState, useEffect } from 'react'
import { Task } from '../../shared/interfaces/task.interface'

/**
 * Custom hook to get the closest due date from a list of tasks.
 *
 * @param {Task[]} tasks - The list of tasks.
 * @returns {number | null} The timestamp of the closest due date, or null if no due date is found.
 */
const useClosestDueDate = (tasks: Task[]) => {
  const [closestDueDate, setClosestDueDate] = useState<number | null>(null)

  /**
   * Effect to update the closest due date when the tasks change.
   */
  useEffect(() => {
    setClosestDueDate(getClosestDueDateTimestamp(tasks))
  }, [tasks])

  /**
   * Gets the timestamp of the closest due date from a list of tasks.
   *
   * @param {Task[]} tasks - The list of tasks.
   * @returns {number | null} The timestamp of the closest due date, or null if no due date is found.
   */
  const getClosestDueDateTimestamp = (tasks: Task[]): number | null => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let closestDate: number | null = null
    for (const task of tasks) {
      const dueDate = new Date(task.dueDate)
      if (dueDate >= today) {
        if (closestDate === null || dueDate.getTime() < closestDate) {
          closestDate = dueDate.getTime()
        }
      }
    }
    return closestDate
  }

  return closestDueDate
}

export default useClosestDueDate
