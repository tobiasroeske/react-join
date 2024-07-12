

import '../index.css';
import PageLayout from '../shared/components/pageLayout';
import Summary from './components/summaryComponent';


function SummaryPage() {
    return (
        <>
            <PageLayout Component={Summary} onContactPage={false} />
        </>

    );
}

export default SummaryPage;