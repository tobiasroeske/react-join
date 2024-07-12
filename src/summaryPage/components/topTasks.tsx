import styles from '../summaryPage.module.css'

type TopTasksProps = {
    icon: any
    amount: number,
    title: string,
    navigate: () => void,
}

function TopTasks({ icon, amount, title, navigate }: TopTasksProps) {
    return (
        <div className={styles.topTask} onClick={navigate}>
            <div className={styles.iconBox}>
                {icon}
            </div>
            <div className={styles.tasks}>
                {amount}
                <span>{title}</span>
            </div>
        </div>
    );
}

export default TopTasks;