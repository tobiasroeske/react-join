import '../index.css'
import styles from './loginPage.module.css'
import LoginHeader from './components/loginHeader'
import { LoginContainer } from './components/loginContainer'
import { Footer } from '../shared/components/footerComponent'
import Intro from './components/intro'
import { useEffect, useState } from 'react'
import SignUpContainer from './components/signUpContainerComponent'

function LoginPage() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  function handleResize() {
    window.innerWidth <= 950 ? setIsSmallScreen(true) : setIsSmallScreen(false)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.main}>
      <LoginHeader isSmallScreen={isSmallScreen} />
      <LoginContainer />
      {isSmallScreen && <SignUpContainer />}
      <Footer />
      <Intro />
    </div>
  )
}

export default LoginPage
