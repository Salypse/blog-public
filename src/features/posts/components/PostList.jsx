import PostPreview from "./PostPreview";

function PostList({ posts }) {
  return (
    <>
      {posts.length >= 1 ? (
        <ul data-testid="posts-list">
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
