import { useEffect, useState } from "react";
import ContactBar from "./contactBarComponent";
import ContactPreview from "./contactPreviewComponent";
import { Contact } from "../../shared/interfaces/contact.interface";
import Popup from "./popupComponent";

const TRANSITION_DELAY = 2000

function Contacts() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [editContact, setEditContact] = useState<boolean>(false);
    const [creationSuccesful, setCreationSuccesful] = useState<boolean>(false);
    const [contactDetailVisability, setContactDetailVisability] = useState<boolean>(true);
    const [showContact, setShowContact] = useState<boolean>(false)

    function handleContactSelect(contact: Contact) {
        setSelectedContact(contact);
    }

    function checkScreenSize() {
        window.innerWidth <= 1060 ? setContactDetailVisability(false) : setContactDetailVisability(true);
    }

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        console.log(showContact)
        return () => window.removeEventListener('resize', checkScreenSize)

    }, [contactDetailVisability, showContact])

    function togglePopup() {
        setShowPopup(!showPopup);
    }

    function handleShowContact() {
        if (!contactDetailVisability) {
            setShowContact(true);
        }
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
            {!showContact &&
                <ContactBar
                    onContactSelect={handleContactSelect}
                    onShowPopup={togglePopup}
                    contactDetailVisability={contactDetailVisability}
                    showContact={handleShowContact}
                />}
            {contactDetailVisability || showContact ?
                <ContactPreview
                    creationSuccesful={creationSuccesful}
                    selectedContact={selectedContact}
                    onEditContact={handleEditContact} />
                : ''
            }
            {showPopup && <Popup
                creationSuccesful={showSuccesMessage}
                onShowPopup={togglePopup}
                editContact={editContact}
                selectedContact={selectedContact}
                onContactEdit={handleContactEdit} />}
        </>


    );
}

export default Contacts;