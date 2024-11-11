import { Task } from '../interfaces/task.interface'

/**
 * Checks the priority of a task and returns the corresponding icon path.
 *
 * @param {Task} task - The task object to check.
 * @returns {string | undefined} The path to the priority icon, or undefined if the priority is not recognized.
 */
function checkPriority(task: Task): string | undefined {
  if (task.priority === 'Urgent') {
    return './assets/icons/prio_high_colored.png'
  }
  if (task.priority === 'Medium') {
    return './assets/icons/prio_medium_colored.png'
  }
  if (task.priority === 'Low') {
    return './assets/icons/prio_low_colored.png'
  }
}

export default checkPriority
