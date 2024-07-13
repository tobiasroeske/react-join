
import AddContactDialog from './addContactDialog';

type PopupProps = {
    onShowPopup: () => void
}

function Popup({onShowPopup}: PopupProps) {
    return ( 
        <div className='popup'>
            <AddContactDialog onShowPopup={() => onShowPopup()} />
        </div>
     );
}

export default Popup;