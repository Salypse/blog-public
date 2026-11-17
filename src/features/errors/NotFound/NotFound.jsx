import { Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div id={styles["not-found-page"]}>
      <h1>Page not found.</h1>
      <p>The page you are looking for does not exist</p>
      <Link to="/">Homepage</Link>
    </div>
  );
}

export default NotFound;
