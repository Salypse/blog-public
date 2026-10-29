import { useState } from "react";
import { useNavigate } from "react-router";
import ErrorList from "../../../../components/Errors/ErrorList/ErrorList";
import ErrorMessage from "../../../../components/Errors/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../../components/Loading/LoadingSpinner";

function SignUpForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    setRequestError(null);
    setValidationErrors([]);

    // Get fields from from to send in post request
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(formProps),
      });

      const data = await response.json();

      if (!response.ok) {
        // Validation error check
        if (response.status === 400) {
          setValidationErrors(data.error.errors.map((error) => error.msg));
        } else {
          setRequestError(true);
        }
      } else {
        // Navigate to login on successful response
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setRequestError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {requestError && <ErrorMessage />}

          {validationErrors.length > 0 && <ErrorList errors={validationErrors} />}

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username"></input>

            <label htmlFor="email">Email: </label>
            <input type="email" name="email"></input>

            <label htmlFor="password">Password: </label>
            <input type="password" name="password"></input>

            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input type="password" name="confirmPassword"></input>

            <button type="submit">Sign Up</button>
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default SignUpForm;
