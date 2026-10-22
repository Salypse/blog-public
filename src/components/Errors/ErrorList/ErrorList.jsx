import styles from "./ErrorList.module.css";

function ErrorList(props) {
  return (
    <ul>
      {props.errors.map((error, index) => (
        <li key={index} className={styles["error-message"]}>
          {error}
        </li>
      ))}
    </ul>
  );
}

export default ErrorList;
