
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { useAuthContext } from '../shared/authProvider';
import Header from '../shared/components/header/header';
import Sidenav from '../shared/components/sidenav/sidenav';


function SummaryPage() {
    const authContext = useAuthContext();
    const { user, loading, logoutUser } = authContext;
    const navigate = useNavigate();

    async function logout() {
        await logoutUser();
        navigate('/login');
    }
    
    return (
        <>
            <div className='main-page'>
                <Sidenav />
                <div className='content-complete'>
                    <Header />
                    <div className='main-content'>
                        {loading ? <h1>It is loading cunt</h1> : ''}
                        <h1>Summary</h1>
                        <h1>{user === null ? <span>fuck you</span> : <span>{user.displayName}</span>}</h1>
                        <button onClick={logout} className='submitBtn'>Logout</button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SummaryPage;