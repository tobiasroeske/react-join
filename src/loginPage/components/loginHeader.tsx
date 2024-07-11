import { Link } from 'react-router-dom';
import styles from '../loginPage.module.css';

export default function LoginHeader() {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="/assets/img/logo_login.png" alt="" />
            <div className={styles.signupContainer}>
                <span>Not a Join User?</span>
                <Link to="/register"><button className={styles.signupBtn}>Sign up</button></Link>
            </div>
        </header>
    )
}