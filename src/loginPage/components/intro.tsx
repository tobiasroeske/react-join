import useOrientation from "../../shared/hooks/useOrientation";

function Intro() {

    const { isMobile } = useOrientation();

    return (
        <div className="intro-container" style={isMobile ? {backgroundColor: '#2A3647'}: {}}>
            {!isMobile ? 
            <img src="./assets/img/logo_intro.png" alt="" className="intro-logo" />
            :
            <img src="./assets/img/logo_dark.png" alt="" className="intro-logo-mobile" />
            }
            
        </div>
    );
}

export default Intro;