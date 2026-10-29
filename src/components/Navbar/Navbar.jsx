import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { AuthContext } from "../layouts/AuthContext";
import { useContext } from "react";

function Navbar() {
  const { user, authStatus, logout } = useContext(AuthContext);

  return (
    <nav>
      <h1>
        <Link to="">Navbar</Link>
      </h1>

      {authStatus !== "loading" ? (
        !user ? (
          <Link to="login">Login</Link>
        ) : (
          <>
            <strong>{user.username}</strong>
            <button onClick={logout}>Logout</button>
          </>
        )
      ) : (
        <></>
      )}
    </nav>
  );
}

export default Navbar;
