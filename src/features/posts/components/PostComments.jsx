import { useState } from "react";
import Comment from "./Comment";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

import PostCommentForm from "./PostCommentForm";
import styles from "../styles/PostComments.module.css";

function PostComments({ initialComments }) {
  const [comments, setComments] = useState(() => initialComments);
  const [isLoading, setIsLoading] = useState(false);

  function onDeleteComment(commentId) {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    setIsLoading(false);
  }

  return (
    <section id={styles["post-comments"]}>
      <h2>Comments</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <PostCommentForm setIsLoading={setIsLoading} setComments={setComments} />

          {/* Comments lists */}
          {comments.length > 0 ? (
            <ul id={styles["post-comments-list"]}>
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
        </>
      )}
    </section>
  );
}

export default PostComments;
