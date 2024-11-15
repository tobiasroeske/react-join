import formatDateInText from '../../shared/utils/formatDateInText'
import styles from '../summaryPage.module.css'
import classNames from 'classnames'

const urgentSvg = (
  <svg
    width="35"
    height="26"
    viewBox="0 0 35 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_62_693)">
      <path
        d="M33.0159 25.9714C32.6149 25.9721 32.2242 25.8425 31.9014 25.6018L17.7961 15.0719L3.69086 25.6018C3.49283 25.7499 3.26792 25.8571 3.02896 25.9172C2.78999 25.9774 2.54166 25.9893 2.29814 25.9524C2.05462 25.9154 1.82068 25.8302 1.60967 25.7018C1.39867 25.5733 1.21473 25.4041 1.06837 25.2037C0.922001 25.0033 0.816072 24.7757 0.756628 24.5339C0.697184 24.2921 0.68539 24.0408 0.721918 23.7944C0.79569 23.2967 1.06181 22.849 1.46174 22.5499L16.6816 11.1765C17.0041 10.9349 17.3948 10.8044 17.7961 10.8044C18.1974 10.8044 18.5881 10.9349 18.9107 11.1765L34.1305 22.5499C34.4483 22.7869 34.684 23.1194 34.8039 23.5001C34.9238 23.8807 34.9218 24.2899 34.7982 24.6693C34.6746 25.0487 34.4357 25.3789 34.1157 25.6127C33.7956 25.8466 33.4107 25.9721 33.0159 25.9714Z"
        fill="white"
      />
      <path
        d="M33.0159 16.0195C32.6149 16.0202 32.2242 15.8906 31.9014 15.6499L17.7961 5.11998L3.69087 15.6499C3.29094 15.949 2.78996 16.0751 2.29815 16.0004C1.80634 15.9258 1.36397 15.6565 1.06837 15.2518C0.772775 14.8471 0.648154 14.3401 0.721925 13.8425C0.795697 13.3448 1.06182 12.8971 1.46175 12.598L16.6816 1.22459C17.0041 0.98296 17.3948 0.852539 17.7961 0.852539C18.1974 0.852539 18.5881 0.98296 18.9107 1.22459L34.1305 12.598C34.4483 12.835 34.684 13.1675 34.8039 13.5482C34.9238 13.9288 34.9218 14.338 34.7982 14.7174C34.6746 15.0968 34.4357 15.427 34.1157 15.6608C33.7956 15.8947 33.4107 16.0202 33.0159 16.0195Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_62_693">
        <rect
          width="34.186"
          height="25.1163"
          fill="white"
          transform="translate(0.703125 0.85498)"
        />
      </clipPath>
    </defs>
  </svg>
)

type UrgentTaskProps = {
  navigate: () => void
  amount: number
  dueDate: number | null
}

function UrgentTask({ navigate, amount, dueDate }: UrgentTaskProps) {
  return (
    <div className={styles.urgentTask} onClick={navigate}>
      <div className={styles.taskContainer}>
        <div className={classNames(styles.iconBox, styles.red)}>
          {urgentSvg}
        </div>
        <div className={styles.tasks}>
          {amount}
          <span>Urgent</span>
        </div>
      </div>

      <div className={styles.verticalSeperator}></div>

      <div className={styles.dueDateContainer}>
        <span className={styles.date}>
          {dueDate ? formatDateInText(dueDate) : 'No tasks created'}
        </span>
        <span className={styles.deadline}> Upcoming Deadline</span>
      </div>
    </div>
  )
}

export default UrgentTask
