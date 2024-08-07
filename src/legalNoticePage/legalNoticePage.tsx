import PageLayout from "../shared/components/pageLayout";
import LegalNotice from "./legalNoticeComponent";

function LegalNoticePage() {
    return ( 
        <>
            <PageLayout onContactPage={true} Component={LegalNotice}/>
        </>
        
     );
}

export default LegalNoticePage;