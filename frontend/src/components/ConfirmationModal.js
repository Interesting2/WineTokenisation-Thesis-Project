import React from 'react'
import styles from './ConfirmationModal.module.css'

const ConfirmationModal = ({confirmationText, confirmationTitle, closeModal, confirmPurchase, isError }) => {

    const handleConfirmAction = () => {
        if (isError) {
            closeModal(false);
        } else {
            confirmPurchase();
        }
    }
  return (
    <div className={styles.modal}>
        <div className={styles.modalExit}>
        <div className={styles.modalExitContent}>
            <div className={styles.modalExitTitle}>
            {confirmationTitle}
            </div>
            <div className={styles.modalExitDesc}>
                {confirmationText}
            </div>
        </div>
        <div id={styles.modalCancel} className={styles.modalExitButton} onClick={() => {closeModal(false)}}>
            Cancel
        </div>
        <div id={styles.modalConfirm} className={styles.modalExitButton} onClick={handleConfirmAction}>
            Confirm
        </div>
        </div>
    </div>
  )
}

export default ConfirmationModal