
import {  useAuthContext } from "../../shared/authProvider";
import { registerProps } from "../registerPage";
import { useFirestoreContext } from "../../shared/firestoreProvider";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import styles from '../registerPage.module.css';
import { SubmitBtn } from "../../shared/components/submitBtnComponent";


type FormFields = { name: string, email: string, password: string, confirmedPassword: string, checkboxInput: boolean };

export function RegisterForm( {isSuccessful, onShow} : registerProps ) {
    const authContext = useAuthContext()
    const firestoreContext = useFirestoreContext();
    const { createUser } = authContext;
    const { addUser, updateUser } = firestoreContext;
    const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();
    const navigate = useNavigate();
    const password = watch('password', '')

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            let userCredentials = await createUser(data.email, data.password);
            let newUser = {...userCredentials.user};
            newUser.displayName = data.name;
            await updateProfile(userCredentials.user, { displayName: data.name });
            await addUser(userCredentials.user.uid, userCredentials);
            await updateUser(userCredentials.user.uid, newUser);
            pipeToLogin();
        } catch (error: any) {
            setError('root', {
                message: "This email is already taken"
            })
        }
    }

    function pipeToLogin() {
        onShow();
        setTimeout(() => navigate("/login"), 1500);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className="inputContainer">
                <label htmlFor="nameInput" />
                <input {...register('name', {
                    required: "Name is required",
                    minLength: { value: 3, message: "Please enter at least 3 characters" }
                })} type="text" id="nameInput" name='name' placeholder='Name' />
                <img src="/assets/icons/person.png" alt="" />
                {errors.name && <span className='error-message'>{errors.name.message}</span>}
            </div>

            <div className="inputContainer">
                <label htmlFor="emailInput" />
                <input {...register('email', {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Please enter a valid email address',
                    },
                })} type="email" id="emailInput" name='email' placeholder='Email' />
                <img src="/assets/icons/mail.png" alt="" />
                {errors.email && <span className='error-message'>{errors.email.message}</span>}
                {errors.root && <span className='error-message'>{errors.root.message}</span>}
            </div>
            <div className="inputContainer password-container">
                <label htmlFor="password" />
                <input {...register('password', {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    }
                })} type="password" id="password" name="password" placeholder='Password' />
                <img src="/assets/icons/lock.png" alt="" />
                {errors.password && <span className='error-message password-error'>{errors.password.message}</span>}
            </div>
            <div className="inputContainer">
                <label htmlFor="confirmedPassword" />
                <input {...register('confirmedPassword', {
                    required: "Pasword Confirmation is required",
                    validate: value => value === password || "The passwords do not match"
                })} type="password" id="confirmedPassword" name="confirmedPassword" placeholder='Confirm Password' />
                <img src="/assets/icons/lock.png" alt="" />
                {errors.confirmedPassword && <span className='error-message'>{errors.confirmedPassword.message}</span>}
            </div>
            <div className='checkboxContainer'>
                <input {...register('checkboxInput', {
                    required: "You must accept the privacy policy",
                })} type="checkbox" id="checkboxInput" />
                <label htmlFor="checkboxInput">I accept the <Link to="/privacy" className={styles.privacyLink}>Privacy policy</Link></label>
                {errors.checkboxInput && <span className='error-message checkbox-error'>{errors.checkboxInput.message}</span>}
            </div>
            <div className={styles.actionContainer}>
                <SubmitBtn text={'Sign up'} disabled={isSubmitting} />
            </div>
        </form>
    )
}

export default RegisterForm