function Comment({ comment }) {
  const postDate = new Date(comment.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(postDate);

  return (
    <article className="comment">
      <div className="comment-info">
        <p>{comment.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      <p>{comment.message}</p>
    </article>
  );
}

export default Comment;
