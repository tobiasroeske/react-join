import styles from '../summaryPage.module.css'
type BottomTaskProps = {
  amount: number
  title: string
  navigate: () => void
}

function BottomTask({ amount, title, navigate }: BottomTaskProps) {
  return (
    <div className={styles.bottomTask} onClick={navigate}>
      {amount}
      <span className={styles.taskTitle}>{title}</span>
    </div>
  )
}

export default BottomTask
