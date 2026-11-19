import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({ children, openContent = "Open", type = "text", label }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="modal-open-btn"
        aria-label={label ?? undefined}
      >
        {type === "text" && openContent}

        {type === "img" && <img src={openContent} aria-hidden="true" />}
      </button>

      {showModal &&
        createPortal(
          <>
            <div className={styles["modal-overlay"]} />

            <div className={styles.modal}>
              {children}
              <button
                id={styles["modal-close-btn"]}
                onClick={() => setShowModal(false)}
                aria-label="close delete comment popup"
              >
                <img src="/images/icons/close.svg" aria-hidden="true" />
              </button>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

export default Modal;
