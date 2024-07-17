import { useEffect, useState } from "react";
import useContacts from "../../shared/hooks/useContacts";
import styles from '../addTaskPage.module.css';
import Dropdown from "./dropdownComponent";
import { Contact } from "../../shared/interfaces/contact.interface";
import getInitials from "../../shared/utils/getInitials";
import classNames from "classnames";

function AddContactSelect() {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [showContacts, setShowContacts] = useState<boolean>(false);
    let contacts = useContacts();

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function handleContactSelect(selectedContact: Contact) {
        let newSelectedContacts: Contact[] = [...selectedContacts];
        let contactIndex = newSelectedContacts.findIndex(contact => contact.id === selectedContact.id);
        if (contactIndex === -1) {
            newSelectedContacts.push(selectedContact);
        } else {
            newSelectedContacts.splice(contactIndex, 1);
        }
        setSelectedContacts(newSelectedContacts);
    }

    function toggleExtraContactPopup() {
        setShowContacts(!showContacts)
    }

    useEffect(() => {
        console.log(selectedContacts);
    }, [selectedContacts]);

    return (
        <>
            <div className='inputContainer'>
                <label htmlFor="assignedContacts">Assigned to</label>
                <input
                    type="text"
                    id="assignedContacts"
                    name="assignedContacts"
                    placeholder="Select contacts to assign"
                    onClick={toggleDropdown}
                    readOnly
                />
                {showDropdown ? (
                    <img src="/assets/icons/arrow_drop_down_close.svg" className={styles.dropwArrow} alt="" />
                ) : (
                    <img src="/assets/icons/arrow_drop_down.png" alt="" className={styles.dropwArrow} />
                )}
                {showDropdown && (
                    <Dropdown
                        selectedContacts={selectedContacts}
                        onContactSelect={handleContactSelect}
                        contacts={contacts}
                    />
                )}
            </div>
            {selectedContacts.length > 0 && (
                <div className={styles.selectedContacts}>
                    {selectedContacts.map((contact, index) =>
                        index <= 3 && (
                            <div key={contact.id} className={styles.initials} style={{ backgroundColor: contact.color }}>
                                {getInitials(contact.name)}
                            </div>
                        )
                    )}
                    {selectedContacts.length > 4 && (
                        <>
                            <div className={classNames(styles.initials, styles.extra)} onMouseEnter={toggleExtraContactPopup} onMouseLeave={toggleExtraContactPopup}>
                                +{selectedContacts.length - 4}
                            </div>
                            <div className={styles.extraContacts} style={showContacts ? {opacity: '1'}: {opacity: ''}}>
                                {selectedContacts.map((contact, index) =>
                                    index > 3 && (
                                        <div key={contact.id} className={styles.initials} style={{ backgroundColor: contact.color }}>
                                            {getInitials(contact.name)}
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default AddContactSelect;
