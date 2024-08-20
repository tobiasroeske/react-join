import { useEffect, useState } from 'react';
import { useAuthContext } from '../../authProvider'
import useUserInitials from '../../hooks/useInitials.hook';
import styles from './header.module.css'
import ProfileDialog from './profileDialogComponent';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const AuthContext = useAuthContext();
    const [showProfileDialog, setShowProfileDialog] = useState<boolean>(false)
    const [onSpecialPage, setOnSpecialPage] = useState<boolean>(false);
    const { user } = AuthContext;
    const location = useLocation();
    const initials = useUserInitials(user);
    

    useEffect(() => {
        const specialPathNames = ['/help', 'legal-notice', 'privacy-policy'];
        const isSpecialPage = specialPathNames.some(path => location.pathname.includes(path));
        setOnSpecialPage(isSpecialPage);
    }, [location.pathname]);

    function toggleProfileDialog() {
        setShowProfileDialog(prev => !prev);
    }

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.headline}>Kanban Project Management Tool</h1>
                <img src="./assets/img/logo_login.png" alt="logo" className={styles.logoMobile}/>
                <div className={styles.profileContainer} >
                    <Link data-testid="helpLink" to='/help' target="_blank" rel="noopener noreferrer" className={styles.extraLink}><img src="/assets/icons/help.png" alt="help icon" /></Link>
                    <div data-testid="profile-initials" className={styles.initials} onClick={toggleProfileDialog} style={onSpecialPage ? {borderColor: 'white'}: {}}>
                        {initials}
                    </div>
                </div>
                {showProfileDialog && <ProfileDialog />}
        
            </header>
        </>
    )
}

export default Header