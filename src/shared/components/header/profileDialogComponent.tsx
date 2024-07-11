import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css'
import { useAuthContext } from '../../authProvider';

function ProfileDialog() {
    const authContext = useAuthContext();
    const {logoutUser} = authContext;
    const navigate = useNavigate();

    async function logout() {
        try {
            await logoutUser();
            navigate('/login')
        } catch (error) {
            console.error('Error while logging out', error);
        }
    }

    return (
        <div className={styles.dialog}>
            <Link to="/legal-notice" className={styles.link}>Legal Notice</Link>
            <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
            <span className={styles.link} onClick={logout}>Logout</span>
        </div>
    );
}

export default ProfileDialog;