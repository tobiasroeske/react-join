
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import LoadingSpinner from "./loadingSpinnerComponent";
import { useAuthContext } from "../authProvider";

type PageLayoutProps = {
    Component: React.ComponentType,
    onContactPage: boolean
}

function PageLayout({Component, onContactPage}: PageLayoutProps) {
    const authContext = useAuthContext()
    const { loading } = authContext;

    return (
        <>
            <div className='main-page'>
                <Sidenav />
                <div className='content-complete'>
                    <Header />
                    <div className={onContactPage ? 'contactPageContainer' : 'main-content'}>
                        {loading ? <LoadingSpinner />  : <Component/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageLayout;