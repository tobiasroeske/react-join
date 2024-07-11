import '../index.css';
import Header from '../shared/components/header/header';
import Sidenav from '../shared/components/sidenav/sidenav';

function ContactsPage() {
    return (
        <>
        <div className='main-page'>
            <Sidenav />
            <div className='content-complete'>
                <Header />
                <div className='main-content'>  
                    <h1>Contacts</h1>
                </div>
            </div>
        </div>
        </>
    );
}

export default ContactsPage;