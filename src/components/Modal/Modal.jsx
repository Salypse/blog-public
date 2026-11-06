import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({ children, openText = "Open" }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{openText}</button>

      {showModal &&
        createPortal(
          <>
            <div className={styles["modal-overlay"]} />

            <div className={styles.modal}>
              {children}
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

export default Modal;
