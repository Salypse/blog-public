import Post from "./Post";

function PostList({ posts }) {
  return (
    <>
      {posts.length >= 1 ? (
        <ul data-testid="posts-list">
          {posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
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
