import { useEffect, useState } from 'react'
import { useAuthContext } from '../../authProvider'
import useUserInitials from '../../hooks/useInitials.hook'
import styles from './header.module.css'
import ProfileDialog from './profileDialogComponent'
import { Link, useLocation } from 'react-router-dom'

/**
 * Header component.
 *
 * @returns {JSX.Element} The rendered component.
 */
function Header() {
  const AuthContext = useAuthContext()
  const [showProfileDialog, setShowProfileDialog] = useState<boolean>(false)
  const [onSpecialPage, setOnSpecialPage] = useState<boolean>(false)
  const { user } = AuthContext
  const location = useLocation()
  const initials = useUserInitials(user)

  /**
   * Effect to determine if the current page is a special page.
   *
   * Updates the state variable `onSpecialPage` based on the current pathname.
   */
  useEffect(() => {
    const specialPathNames = ['/help', 'legal-notice', 'privacy-policy']
    const isSpecialPage = specialPathNames.some((path) =>
      location.pathname.includes(path)
    )
    setOnSpecialPage(isSpecialPage)
  }, [location.pathname])

  /**
   * Toggles the visibility of the profile dialog.
   */
  function toggleProfileDialog() {
    setShowProfileDialog((prev) => !prev)
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headline}>Kanban Project Management Tool</h1>
        <img
          src="./assets/img/logo_login.png"
          alt="logo"
          className={styles.logoMobile}
        />
        {!onSpecialPage && user && (
          <div className={styles.profile} onClick={toggleProfileDialog}>
            <span className={styles.initials}>{initials}</span>
          </div>
        )}
      </header>
      {showProfileDialog && <ProfileDialog />}
    </>
  )
}

export default Header
