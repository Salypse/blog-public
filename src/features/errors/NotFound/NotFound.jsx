import { Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <>
      <h1>Page not found.</h1>
      <Link to="/">Homepage</Link>
    </>
  );
}

export default NotFound;
