import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthContext } from '../../shared/authProvider'
import { SubmitBtn } from '../../shared/components/submitBtnComponent'
import styles from '../loginPage.module.css'
import { ChangeEvent, useState, useEffect } from 'react'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

type FormFields = {
  email: string
  password: string
}

/**
 * LoginForm component.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function LoginForm() {
  const authContext = useAuthContext()
  const { loginUser } = authContext
  const { register, handleSubmit, setValue } = useForm<FormFields>()
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const navigate = useNavigate()

  /**
   * Effect to load stored credentials if "Remember Me" is checked.
   */
  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true'
    setRememberMe(storedRememberMe)
    if (storedRememberMe) {
      const storedEmail = localStorage.getItem('email') || ''
      const storedPassword = localStorage.getItem('password') || ''
      setValue('email', storedEmail)
      setValue('password', storedPassword)
    }
  }, [setValue])

  /**
   * Handles the form submission to log in a user.
   *
   * @param {FormFields} data - The form data.
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await loginUser(data.email, data.password)
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('email', data.email)
        localStorage.setItem('password', data.password)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
      }
      navigate('/summary')
    } catch (error) {
      handleError(error)
    }
  }

  async function guestLogin() {
    try {
      await loginUser('guest@guest.de', '12345678')
      navigate('/summary')
    } catch (error) {
      console.error('Error logging in as guest', error)
    }
  }

  /**
   * Handles changes to the "Remember Me" checkbox.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setRememberMe(isChecked)
    localStorage.setItem('rememberMe', isChecked.toString())
    if (!isChecked) {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
  }

  function handleError(error: unknown) {
    if (error instanceof FirebaseError) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-email'
      ) {
        setErrorMessage(true)
      } else {
        console.error('Error while logging in', error)
      }
    } else {
      console.error('Unexpected error', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
      </div>
      <div className={styles.rememberMe}>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      {errorMessage && (
        <p className={styles.error}>Invalid email or password</p>
      )}
      <div className={styles.actionContainer}>
        <SubmitBtn text={'Log in'} disabled={false} />
        <div className={styles.guestLoginBtn} onClick={guestLogin}>
          Guest Log in
        </div>
      </div>
    </form>
  )
}
