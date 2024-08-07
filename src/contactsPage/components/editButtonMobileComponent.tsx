import styles from "../contactsPage.module.css";

type EditBtnMobileProps = {
    editContact: () => void,
    onHandleDelete: () => Promise<void>,
    showButton: boolean,
    setShowButton: (value: boolean) => void,
}

function EditBtnMobile({editContact, onHandleDelete, showButton, setShowButton }: EditBtnMobileProps) {
    
    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();
        setShowButton(false);
    }

    function handleEditContact(e: React.MouseEvent) {
        e.stopPropagation();
        editContact();
        setShowButton(true);
    }

    function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        onHandleDelete();
        setShowButton(true);
    }

    if (showButton) {
        return (
            <div className={styles.editBtn} onClick={handleClick}>
                <img src="/assets/icons/more_vert.png" alt="" />
            </div>
        )
    } else {
        return (
            <div className={styles.editMenu} onClick={(e) => e.stopPropagation()}>
                <span onClick={handleEditContact}><img src="/assets/icons/edit.png" alt="" />Edit</span>
                <span onClick={handleDelete}><img src="/assets/icons/delete.svg" alt="" />Delete</span>
            </div>
        )
    }
}

export default EditBtnMobile;