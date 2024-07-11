import { registerProps } from "../registerPage";
import styles from '../registerPage.module.css';
import BackArrow from "../../shared/components/backArrowComponent";
import RegisterForm from "./registerForm";

function SignupContainer( {isSuccessful, onShow} : registerProps ) {
    return (
        <div className={styles.signupContainer}>
            <div className={styles.headline}>
                <h1>Sign up</h1>
                <div className={styles.seperator}></div>
            </div>
            <RegisterForm isSuccessful={isSuccessful} onShow={() => onShow()}/>
            <BackArrow top={'72px'} left={'48px'} />
        </div>
    )
}

export default SignupContainer