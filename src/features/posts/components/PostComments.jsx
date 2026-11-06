import { useState } from "react";
import Comment from "./Comment";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

function PostComments({ initialComments }) {
  const [comments, setComments] = useState(() => initialComments);
  const [isLoading, setIsLoading] = useState(false);

  function onDeleteComment(commentId) {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    setIsLoading(false);
  }

  return (
    <section id="comments">
      <h2>Comments</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : comments.length > 0 ? (
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
    </section>
  );
}

export default PostComments;
