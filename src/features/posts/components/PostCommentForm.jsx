import { useParams } from "react-router";
import { createPostComment } from "../api/createPostComment";
import { useContext, useState } from "react";
import { AuthContext } from "../../../components/layouts/AuthContext";
import ErrorList from "../../../components/Errors/ErrorList/ErrorList";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import styles from "../styles/PostCommentForm.module.css";

function PostCommentForm({ setComments }) {
  const { id } = useParams();
  const { user, authStatus, accessToken, setAccessToken } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);

    try {
      setValidationErrors([]);
      setIsSubmitting(true);

      const data = await createPostComment(id, formProps, accessToken, setAccessToken, setComments);

      if (data.errors) {
        setValidationErrors(data.errors.map((error) => error.msg));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setInputValue("");
    }
  }

  return (
    <div id={styles["post-comment-form-container"]}>
      {user && authStatus === "authenticated" ? (
        <>
          {validationErrors.length > 0 && <ErrorList errors={validationErrors} />}

          <form onSubmit={handleSubmit} id={styles["post-comment-form"]}>
            <input
              id="comment-message"
              name="commentMessage"
              onChange={(event) => setInputValue(event.target.value)}
              value={inputValue}
              placeholder="Add a comment"
            ></input>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner size="small" /> : "Post comment"}
            </button>
          </form>
        </>
      ) : (
        <p>Logged out</p>
      )}
    </div>
  );
}

export default PostCommentForm;
