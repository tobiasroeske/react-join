import { useState } from "react";
import ContactBar from "./contactBarComponent";
import ContactPreview from "./contactPreviewComponent";
import { Contact } from "../../shared/interfaces/contact.interface";

import Popup from "./popupComponent";

function Contacts() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [slideInAnimation, setSlideInAnimation] = useState<boolean>(false)
    const [showPopup, setShowPopup] =useState<boolean>(false)

    function handleContactSelect(contact: Contact) {
        setSlideInAnimation(false);
        setSelectedContact(contact);
        setSlideInAnimation(true)
    }

    function handleShowPopup() {
        setShowPopup(!showPopup);
    }

    return (
        <>
            <ContactBar onContactSelect={handleContactSelect} onShowPopup={handleShowPopup}/>
            <ContactPreview selectedContact={selectedContact} slidedIn={slideInAnimation} />
            {showPopup && <Popup onShowPopup={handleShowPopup} />}
        </>


    );
}

export default Contacts;