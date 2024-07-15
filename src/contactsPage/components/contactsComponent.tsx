import { useState } from "react";
import ContactBar from "./contactBarComponent";
import ContactPreview from "./contactPreviewComponent";
import { Contact } from "../../shared/interfaces/contact.interface";
import Popup from "./popupComponent";

const TRANSITION_DELAY = 2000

function Contacts() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [showPopup, setShowPopup] =useState<boolean>(false)
    const [editContact, setEditContact] = useState<boolean>(false);
    const [creationSuccesful, setCreationSuccesful] = useState<boolean>(false);

    function handleContactSelect(contact: Contact) {
        setSelectedContact(contact);
    }

    function togglePopup() {
        setShowPopup(!showPopup);
    }

    function showSuccesMessage() {
        setCreationSuccesful(true);
        setTimeout(() => {
            setCreationSuccesful(false)
        }, TRANSITION_DELAY)
    }

    function handleEditContact() {
        togglePopup();
        setEditContact(true);
    }

    function handleContactEdit(contact: Contact | null) {
        setSelectedContact(contact)
    }

    return (
        <>
            <ContactBar onContactSelect={handleContactSelect} onShowPopup={togglePopup} />
            <ContactPreview creationSuccesful={creationSuccesful} selectedContact={selectedContact} onEditContact={handleEditContact} />
            {showPopup && <Popup creationSuccesful={showSuccesMessage} onShowPopup={togglePopup} editContact={editContact} selectedContact={selectedContact} onContactEdit={handleContactEdit}/>}
            
        </>


    );
}

export default Contacts;