import styles from "./ErrorList.module.css";

function ErrorList(props) {
  return (
    <ul id={styles["error-list"]}>
      {props.errors.map((error, index) => (
        <li key={index} className={styles["error-message"]}>
          <img src="/images/icons/error.svg" aria-hidden="true" />
          <p role="alert">{error}</p>
        </li>
      ))}
    </ul>
  );
}

export default ErrorList;
