import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["spinner-container"]} data-testid="loading-spinner">
      <div className={styles["loading-spinner"]} />
    </div>
  );
}

export default LoadingSpinner;
