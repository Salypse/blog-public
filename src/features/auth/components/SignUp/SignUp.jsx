import styles from "../../styles/AuthForm.module.css";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <div id={styles["auth-page"]}>
      <title>Sign Up</title>
      <h1>Sign Up!</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
