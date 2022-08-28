import React from "react";
import styles from "./Modal.module.css";

const Modal = (props: any) => {
  const { setIsOpen, modalData } = props;
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{modalData.title}</h5>
          </div>
          <div className={styles.modalContent}>{modalData.message}</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.okBtn} onClick={() => setIsOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
