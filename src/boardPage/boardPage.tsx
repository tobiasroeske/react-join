import '../index.css';
import Header from '../shared/components/header/header';
import Sidenav from '../shared/components/sidenav/sidenav';

function BoardPage() {
    return (
        <>
        <div className='main-page'>
            <Sidenav />
            <div className='content-complete'>
                <Header />
                <div className='main-content'>  
                    <h1>Board</h1>
                </div>
            </div>
        </div>
        </>
    );
}

export default BoardPage;