import { useState } from 'react';
import { useAuthContext } from '../../authProvider'
import useUserInitials from '../../hooks/useInitials.hook';
import styles from './header.module.css'
import ProfileDialog from './profileDialogComponent';

export default function Header() {
    const AuthContext = useAuthContext();
    const [showProfileDialog, setShowProfileDialog] = useState<boolean>(false)
    const { user } = AuthContext;
    const initials = useUserInitials(user);

    function toggleProfileDialog() {
        showProfileDialog ? setShowProfileDialog(false) : setShowProfileDialog(true);
    }

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.headline}>Kanban Project Management Tool</h1>
                <img src="./assets/img/logo_login.png" alt="" className={styles.logoMobile}/>
                <div className={styles.profileContainer} onClick={toggleProfileDialog}>
                    <img src="/assets/icons/help.png" alt="" />
                    <div className={styles.initials}>
                        {initials}
                    </div>
                </div>
                {showProfileDialog && <ProfileDialog />}
        
            </header>
        </>
    )
}