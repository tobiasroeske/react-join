import { useState, useEffect } from 'react';
import { Task } from '../../shared/interfaces/task.interface';

const useClosestDueDate = (tasks: Task[]) => {
    const [closestDueDate, setClosestDueDate] = useState<number | null>(null);

    useEffect(() => {
        setClosestDueDate(getClosestDueDateTimestamp(tasks));
    }, [tasks]);

    const getClosestDueDateTimestamp = (tasks: Task[]): number | null => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let closestDate: number | null = null;
        for (const task of tasks) {
            const dueDate = new Date(task.dueDate);
            if (dueDate >= today) {
                if (closestDate === null || dueDate.getTime() < closestDate) {
                    closestDate = dueDate.getTime();
                }
            }
        }
        return closestDate;
    };

    return closestDueDate;
};

export default useClosestDueDate;
