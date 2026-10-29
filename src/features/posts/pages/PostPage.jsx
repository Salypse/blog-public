import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../api/getPost";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorMessage from "../../../components/Errors/ErrorMessage/ErrorMessage";
import PostData from "../components/PostData";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryStatus, setRetryStatus] = useState(false);

  useEffect(() => {
    // Get and set post data
    const loadPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id, retryStatus]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : !error ? (
        <>
          {/* Post data component */}
          <PostData post={post} />
        </>
      ) : (
        <ErrorMessage onClick={() => setRetryStatus((status) => !status)} />
      )}
    </>
  );
}

export default PostPage;
