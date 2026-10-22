import { useContext, useState } from "react";
import ErrorList from "../../../../components/Errors/ErrorList/ErrorList";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../components/layouts/MainLayout";
import ErrorMessage from "../../../../components/Errors/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../../components/Loading/LoadingSpinner";

function LoginForm(props) {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = props;
  const [requestError, setRequestError] = useState(false);

  const [validationErrors, setValidationErrors] = useState([]);

  const { initializeAuth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset error states
    setRequestError(null);
    setValidationErrors([]);

    // Get fields from form to send in POST request
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);

    try {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formProps),
        },
      );

      if (!response.ok) {
        const data = await response.json();

        //Validation error check
        if (response.status === 400) {
          setValidationErrors(data.error.errors.map((error) => error.msg));
        } else if (response.status === 401) {
          setValidationErrors([data.error.message]);
        } else {
          setRequestError(true);
        }

        setIsLoading(false);
      } else {
        // Update user data before navigation
        await initializeAuth();
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setRequestError(true);
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {requestError && <ErrorMessage />}

          {validationErrors.length > 0 && (
            <ErrorList errors={validationErrors} />
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" />

            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />

            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default LoginForm;
