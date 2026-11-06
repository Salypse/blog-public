import { AuthContext } from "../../../components/layouts/AuthContext";
import { useContext } from "react";
import { useParams } from "react-router";
import { deletePostComment } from "../api/deletePostComment";
import Modal from "../../../components/Modal/Modal";

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
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="comment">
      <div className="comment-info">
        <p>{comment.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      {/* if user is owner of comment allow deletion */}
      {user && user.id === comment.authorId && authStatus === "authenticated" && (
        <Modal openText="Delete comment">
          <strong>Delete this comment?</strong>
          <p>This action cannot be undone.</p>

          <button onClick={() => handleDelete()}>Delete</button>
        </Modal>
      )}

      <p>{comment.message}</p>
    </article>
  );
}

export default Comment;
