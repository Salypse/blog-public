import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { AuthContext } from "../layouts/AuthContext";
import { useContext } from "react";

function Navbar() {
  const { user, authStatus, logout } = useContext(AuthContext);

  return (
    <nav>
      <header>
        <Link to="" className={styles["nav-link"]} aria-label="blog homepage">
          Blog
        </Link>
      </header>

      <div id={styles["nav-auth"]}>
        {authStatus !== "loading" &&
          (!user ? (
            <Link to="login" className={styles["nav-link"]}>
              Login
            </Link>
          ) : (
            <>
              <div id={styles["nav-user"]}>
                <img src="/images/icons/user.svg" aria-hidden="true" />
                <strong>{user.username}</strong>
              </div>
              <button onClick={logout} className={styles["nav-link"]}>
                <strong>Logout</strong>
              </button>
            </>
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
