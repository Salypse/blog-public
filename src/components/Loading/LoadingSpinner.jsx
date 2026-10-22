import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["loading-spinner"]} />
    </div>
  );
}

export default LoadingSpinner;
