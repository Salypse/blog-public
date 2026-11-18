import styles from "../styles/PostData.module.css";

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
      <div id={styles["post-header"]}>
        <h1>{post.header}</h1>

        {/* optional subHeader */}
        {post.subHeader && <p id={styles["post-subheader"]}>{post.subHeader}</p>}
      </div>

      <div id={styles["post-info"]}>
        <p>{post.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      <p id={styles["post-body"]}>{post.body}</p>
    </>
  );
}

export default PostData;
