import { Contact } from '../../shared/interfaces/contact.interface';
import AddContactDialog from './addContactDialog';
import EditContactComponent from './editContactDialog';

type PopupProps = {
    onShowPopup: () => void,
    editContact: boolean,
    selectedContact: Contact | null,
    onContactEdit: (contact: Contact | null) => void,
    creationSuccesful: () => void
}

function Popup({ onShowPopup, editContact, selectedContact, onContactEdit, creationSuccesful }: PopupProps) {
    return (
        <div className='popup'>
            {editContact ? (
                <EditContactComponent onContactEdit={onContactEdit} onShowPopup={onShowPopup} selectedContact={selectedContact} />
            ) : (
                <AddContactDialog creationSuccesful={creationSuccesful} onContactCreation={onContactEdit} onShowPopup={onShowPopup} />
            )}

        </div>
    );
}

export default Popup;