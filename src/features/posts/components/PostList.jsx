import PostPreview from "./PostPreview";
import styles from "../styles/PostList.module.css";

function PostList({ posts }) {
  return (
    <>
      {posts.length >= 1 ? (
        <ul data-testid="posts-list" id={styles["post-list"]}>
          {posts.map((post) => (
            <li key={post.id}>
              <PostPreview post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
}

export default PostList;
