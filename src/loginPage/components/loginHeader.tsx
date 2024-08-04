import styles from '../loginPage.module.css';
import SignUpContainer from './signUpContainerComponent';

type LoginHeaderProps = {
    isSmallScreen: boolean,
}

export default function LoginHeader({isSmallScreen}: LoginHeaderProps) {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="/assets/img/logo_login.png" alt="" />
            {!isSmallScreen && <SignUpContainer />}
            
        </header>
    )
}