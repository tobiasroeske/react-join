
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { useAuthContext } from '../shared/authProvider';
import Header from '../shared/components/header/header';
import Sidenav from '../shared/components/sidenav/sidenav';
import PageLayout from '../shared/components/pageLayout';


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
            <PageLayout loading={loading} />
        </>

    );
}

export default SummaryPage;