import { User } from "firebase/auth";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import LoadingSpinner from "./loadingSpinnerComponent";
import Summary from "../../summaryPage/components/summaryComponent";

type PageLayoutProps = {
    loading: boolean;
}

function PageLayout({loading}: PageLayoutProps) {
    return (
        <>
            <div className='main-page'>
                <Sidenav />
                <div className='content-complete'>
                    <Header />
                    <div className='main-content'>
                        {loading ? <LoadingSpinner />  : <Summary/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageLayout;