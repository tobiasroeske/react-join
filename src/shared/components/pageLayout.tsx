import Header from './header/header'
import Sidenav from './sidenav/sidenav'
import LoadingSpinner from './loadingSpinnerComponent'
import { useAuthContext } from '../authProvider'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

type PageLayoutProps = {
  Component: React.ComponentType
  onContactPage: boolean
}

/**
 * PageLayout component.
 *
 * @param {PageLayoutProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function PageLayout({ Component, onContactPage }: PageLayoutProps) {
  const authContext = useAuthContext()
  const location = useLocation()
  const { loading, user } = authContext
  const [onSpecialPage, setOnSpecialPage] = useState<boolean>(false)

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

  if (user === null && !onSpecialPage && !loading) {
    return (
      <div className="no-login-page">
        <h1>Please Login</h1>
        <Link to="/login" className="go-back-link">
          <button>Go Back</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="page-layout">
      <Header />
      <Sidenav />
      <main>{loading ? <LoadingSpinner /> : <Component />}</main>
    </div>
  )
}

export default PageLayout
