import { Link } from "react-router";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import { useState } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h1>Login</h1>
      <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
      {!isLoading && <Link to="/sign-up">Sign Up</Link>}
    </>
  );
}

export default Login;
