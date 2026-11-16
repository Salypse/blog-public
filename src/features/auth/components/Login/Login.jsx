import { Link } from "react-router";
import styles from "../../styles/AuthForm.module.css";
import LoginForm from "./LoginForm";
import { useState } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div id={styles["auth-page"]}>
      <h1>Login</h1>
      <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
      {!isLoading && (
        <p id={styles["no-account-text"]}>
          No Account? <Link to="/sign-up">Sign Up Now</Link>
        </p>
      )}
    </div>
  );
}

export default Login;
