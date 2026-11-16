import { useEffect, useState } from "react";
import { getPosts } from "../api/getPosts";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorMessage from "../../../components/Errors/ErrorMessage/ErrorMessage";
import PostList from "../components/PostList";
import styles from "../styles/PostsPage.module.css";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryStatus, setRetryStatus] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const postData = await getPosts();

        setPosts(postData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [retryStatus]);

  return (
    <>
      <title>Blog Posts</title>
      <h1 id={styles["posts-page-header"]}>Posts</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : !error ? (
        <PostList posts={posts} />
      ) : (
        <ErrorMessage onClick={() => setRetryStatus((status) => !status)} />
      )}
    </>
  );
}

export default PostsPage;
