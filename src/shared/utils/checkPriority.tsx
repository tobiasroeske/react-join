import { Task } from "../interfaces/task.interface";

function checkPriority(task: Task) {
    if (task.priority === 'Urgent') {
        return "./assets/icons/prio_high_colored.png"
    }
    if (task.priority === 'Medium') {
        return "./assets/icons/prio_medium_colored.png"
    }
    if (task.priority === 'Low') {
        return "./assets/icons/prio_low_colored.png"
    }
}

export default checkPriority