import { useState } from "react";
import ContactBar from "./contactBarComponent";
import ContactPreview from "./contactPreviewComponent";
import { Contact } from "../../shared/interfaces/contact.interface";

function Contacts() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [slideInAnimation, setSlideInAnimation] = useState<boolean>(false)

    function handleContactSelect(contact: Contact) {
        setSlideInAnimation(false);
        setSelectedContact(contact);
        setSlideInAnimation(true)
    }

    return (
        <>
            <ContactBar onContactSelect={handleContactSelect} />
            <ContactPreview selectedContact={selectedContact} slidedIn={slideInAnimation} />
        </>


    );
}

export default Contacts;