import styles from "./ErrorMessage.module.css";

function ErrorMessage({ onClick }) {
  return (
    <div id={styles["error-message-container"]}>
      <p id={styles["error-message"]}>Something went wrong. Please try again.</p>

      {/* Render retry button if onClick was provided */}
      {onClick && (
        <button onClick={onClick} id={styles["error-retry-btn"]}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
