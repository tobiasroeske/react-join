
import '../index.css';
import styles from './registerPage.module.css';
import { useState } from 'react';
import SignupContainer from './components/signupContainer';
import Header from './components/header';
import { Footer } from '../shared/components/footerComponent';

export type registerProps = {
    isSuccessful: boolean,
    onShow: () => void;
}
function RegisterPage() {
    const [showSuccessBox, setIsSuccessful] = useState<boolean>(false);

    return (
        <div className={styles.main}>
            <Header />
            <SignupContainer isSuccessful={showSuccessBox === true} onShow={() => setIsSuccessful(true)} />
            <Footer />
        </div>
    );
}

export default RegisterPage;