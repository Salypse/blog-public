import { AuthContext } from "../../../components/layouts/AuthContext";
import { useContext } from "react";
import { useParams } from "react-router";
import { deletePostComment } from "../api/deletePostComment";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
import styles from "../styles/Comment.module.css";

function Comment({ comment, onDeleteComment, setIsLoading }) {
  const { id } = useParams();
  const { user, authStatus, accessToken, setAccessToken } = useContext(AuthContext);

  const postDate = new Date(comment.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(postDate);

  async function handleDelete() {
    try {
      setIsLoading(true);

      await deletePostComment(id, comment.id, accessToken, setAccessToken);
      onDeleteComment(comment.id);
    } catch (error) {
      console.error(`Deletion error: ${error.message}`);
      toast.error(
        <div>
          Could not delete post <br /> <strong>Please try again</strong>
        </div>,
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className={styles["comment"]}>
      <div className={styles["comment-info"]}>
        <p>{comment.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      <div className={styles["comment-content"]}>
        <p className={styles["comment-message"]}>{comment.message}</p>

        {/* if user is owner of comment allow deletion */}
        {user && user.id === comment.authorId && authStatus === "authenticated" && (
          <Modal openContent="/images/icons/delete.svg" type="img" label="delete comment">
            <strong>Delete this comment?</strong>
            <p>This action cannot be undone.</p>

            <button onClick={() => handleDelete()}>Delete</button>
          </Modal>
        )}
      </div>
    </article>
  );
}

export default Comment;
