
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '../../shared/authProvider';
import { SubmitBtn } from '../../shared/components/submitBtnComponent';
import styles from '../loginPage.module.css';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';


type FormFields = {
    email: string,
    password: string,
}

export default function LoginForm() {
    const authContext = useAuthContext();
    const { loginUser } = authContext;
    const { register, handleSubmit } = useForm<FormFields>();
    const [errorMessage, setErrorMessage] = useState<boolean>(false)
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await loginUser(data.email, data.password)
            navigate('/summary');
        } catch (error) {
            handleError(error);
        }
    }

    function handleError(error: unknown) {
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/invalid-credential' || error.code ==='auth/invalid-email') {
                setErrorMessage(true);
            } else {
                console.error("Error while logging in", error);
            }
        } else {
            console.error("Unexpected error", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className="inputContainer">
                <label htmlFor="email" />
                <input {... register('email')} type="email" id="email" name='email' placeholder='Email' />
                <img src="/assets/icons/mail.png" alt="" />
            </div>
            <div className="inputContainer">
                <label htmlFor="passwordInput" />
                <input {... register('password')} type="password" id="passwordInput" name="password" placeholder='Password' />
                <img src="/assets/icons/lock.png" alt="" />
                {errorMessage && <span className='error-message'>Email or password do not match</span>}
            </div>
            <div className='checkboxContainer'>
                <input type="checkbox" id="checkboxInput" />
                <label htmlFor="checkboxInput">Remeber Me</label>

            </div>
            <div className={styles.actionContainer}>
                <SubmitBtn text={'Log in'} disabled={false} />
                <div className={styles.guestLoginBtn}>Guest Log in</div>
            </div>
        </form>
    )
}