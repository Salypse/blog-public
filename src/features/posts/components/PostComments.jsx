import { useContext, useState } from "react";
import Comment from "./Comment";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import { AuthContext } from "../../../components/layouts/AuthContext";
import PostCommentForm from "./PostCommentForm";

function PostComments({ initialComments }) {
  const [comments, setComments] = useState(() => initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const { user, authStatus } = useContext(AuthContext);

  function onDeleteComment(commentId) {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    setIsLoading(false);
  }

  return (
    <section id="comments">
      <h2>Comments</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* If user is logged in show new comment form */}
          {user && authStatus === "authenticated" ? (
            <PostCommentForm setIsLoading={setIsLoading} setComments={setComments} />
          ) : (
            <p>Login to add a comment!</p>
          )}

          {/* Comments lists */}
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <Comment
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    setIsLoading={setIsLoading}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default PostComments;
