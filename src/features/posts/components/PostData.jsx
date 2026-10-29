function PostData({ post }) {
  const postDate = new Date(post.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(postDate);

  return (
    <>
      <div className="post-header">
        <h1>{post.header}</h1>

        {/* optional subHeader */}
        {post.subHeader && <p>{post.subHeader}</p>}
      </div>

      <div className="post-info">
        <p>{post.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      <p className="post-body">{post.body}</p>
    </>
  );
}

export default PostData;
