import styles from "../styles/Post.module.css";

function Post({ post }) {
  const postDate = new Date(post.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(postDate);

  const formattedBody = post.body.length >= 100 ? post.body.slice(0, 100) + "..." : post.body;

  return (
    <article className={styles.post}>
      <div className="post-info">
        <p>{post.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      <div className="post-header">
        <h2>{post.header}</h2>

        {/* optional subHeader */}
        {post.subHeader && <p>{post.subHeader}</p>}
      </div>

      <p className="post-body">{formattedBody}</p>
      <a href={`/posts/${post.id}`} className={styles["post-link"]} />
    </article>
  );
}

export default Post;
