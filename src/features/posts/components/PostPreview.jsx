import styles from "../styles/PostPreview.module.css";
import { Link } from "react-router";

function PostPreview({ post }) {
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
      <div className={styles["post-info"]}>
        <p>{post.author.username}</p>
        <p>{formattedDate}</p>
      </div>

      <div className={styles["post-header"]}>
        <h2>{post.header}</h2>

        {/* optional subHeader */}
        {post.subHeader && <p>{post.subHeader}</p>}
      </div>

      <p className={styles["post-body"]} data-testid="post-body">
        {formattedBody}
      </p>

      <Link to={`/posts/${post.id}`} className={styles["post-link"]}>
        Read More
        <img src="/images/icons/arrow.svg" aria-hidden="true" />
      </Link>
    </article>
  );
}

export default PostPreview;
