import { useEffect, useState } from "react";
import { getPosts } from "../api/getPosts";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorMessage from "../../../components/Errors/ErrorMessage/ErrorMessage";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : !error ? (
        // If no errors display posts or no posts message
        posts.length >= 1 ? (
          <p>Posts placeholder</p>
        ) : (
          <p>No posts available</p>
        )
      ) : (
        <ErrorMessage onClick={loadPosts} />
      )}
    </>
  );
}

export default PostsPage;
