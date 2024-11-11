import React from 'react'
import styles from './editButtonMobileComponent.module.css'

type EditBtnMobileProps = {
  editContact: () => void
  onHandleDelete: () => Promise<void>
  showButton: boolean
  setShowButton: (value: boolean) => void
}

/**
 * EditBtnMobile component.
 *
 * @param {EditBtnMobileProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
function EditBtnMobile({
  editContact,
  onHandleDelete,
  showButton,
  setShowButton
}: EditBtnMobileProps) {
  /**
   * Handles the click event to hide the button.
   *
   * @param {React.MouseEvent} e - The mouse event.
   */
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    setShowButton(false)
  }

  /**
   * Handles the click event to edit the contact.
   *
   * @param {React.MouseEvent} e - The mouse event.
   */
  function handleEditContact(e: React.MouseEvent) {
    e.stopPropagation()
    editContact()
    setShowButton(true)
  }

  /**
   * Handles the click event to delete the contact.
   *
   * @param {React.MouseEvent} e - The mouse event.
   */
  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    onHandleDelete()
    setShowButton(true)
  }

  if (showButton) {
    return (
      <div className={styles.editBtn} onClick={handleClick}>
        <img src="/assets/icons/more_vert.png" alt="" />
      </div>
    )
  }

  return null
}

export default EditBtnMobile
