import { Link, useNavigate } from 'react-router-dom'
import styles from './header.module.css'
import { useAuthContext } from '../../authProvider'
import classNames from 'classnames'

function ProfileDialog() {
  const authContext = useAuthContext()
  const { logoutUser } = authContext
  const navigate = useNavigate()

  async function logout() {
    try {
      await logoutUser()
      navigate('/login')
    } catch (error) {
      console.error('Error while logging out', error)
    }
  }

  return (
    <div className={styles.dialog}>
      <Link
        to="/help"
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(styles.link, styles.helpLink)}
      >
        Help
      </Link>
      <Link
        to="/legal-notice"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Legal Notice
      </Link>
      <Link
        to="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Privacy Policy
      </Link>
      <span className={styles.link} onClick={logout}>
        Logout
      </span>
    </div>
  )
}

export default ProfileDialog
