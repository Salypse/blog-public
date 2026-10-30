import Comment from "./Comment";

function PostComments({ comments }) {
  console.log(comments);
  return (
    <section id="comments">
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
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
