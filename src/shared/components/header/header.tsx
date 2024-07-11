import { useAuthContext } from '../../authProvider'
import useUserInitials from '../../hooks/useInitials.hook';
import styles from './header.module.css'

export default function Header() {
    const AuthContext = useAuthContext();
    const { user } = AuthContext;
    const initials = useUserInitials(user);

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.headline}>Kanban Project Management Tool</h1>
                <div className={styles.profileContainer}>
                    <img src="/assets/icons/help.png" alt="" />
                    <div className={styles.initials}>
                        {initials}
                    </div>
                </div>
            </header>
        </>
    )
}