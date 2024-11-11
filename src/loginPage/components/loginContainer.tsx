import styles from '../loginPage.module.css'
import LoginForm from './loginForm'

export function LoginContainer() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.headline}>
        <h1>Log in</h1>
        <div className={styles.seperator}></div>
      </div>
      <LoginForm />
    </div>
  )
}
