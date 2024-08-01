import '../index.css';
import styles from './loginPage.module.css';
import LoginHeader from './components/loginHeader';
import { LoginContainer } from './components/loginContainer';
import { Footer } from '../shared/components/footerComponent';
import Intro from './components/intro';

function LoginPage() {
    return (
        <div className={styles.main}>
            <LoginHeader />
            <LoginContainer />
            <Footer />
            <Intro />
        </div>
    );
}

export default LoginPage;