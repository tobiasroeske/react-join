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

export default function LoginForm() {
  const authContext = useAuthContext()
  const { loginUser } = authContext
  const { register, handleSubmit, setValue } = useForm<FormFields>()
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const navigate = useNavigate()

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

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setRememberMe(e.target.checked)
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
      <div className="inputContainer">
        <label htmlFor="email" />
        <input
          {...register('email')}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <img src="/assets/icons/mail.png" alt="" />
      </div>
      <div className="inputContainer">
        <label htmlFor="passwordInput" />
        <input
          {...register('password')}
          type="password"
          id="passwordInput"
          name="password"
          placeholder="Password"
        />
        <img src="/assets/icons/lock.png" alt="" />
        {errorMessage && (
          <span className="error-message">Email or password do not match</span>
        )}
      </div>
      <div className="checkboxContainer">
        <input
          type="checkbox"
          id="checkboxInput"
          name="checkboxInput"
          checked={rememberMe}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkboxInput">Remember Me</label>
      </div>
      <div className={styles.actionContainer}>
        <SubmitBtn text={'Log in'} disabled={false} />
        <div className={styles.guestLoginBtn} onClick={guestLogin}>
          Guest Log in
        </div>
      </div>
    </form>
  )
}
