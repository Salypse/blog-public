import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({ size = "large" }) {
  return (
    <div className={styles["spinner-container"]} data-testid="loading-spinner">
      <div className={`${styles["loading-spinner"]} ${styles[`loading-spinner--${size}`]}`} />
    </div>
  );
}

export default LoadingSpinner;
