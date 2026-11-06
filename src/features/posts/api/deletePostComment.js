import protectedApiCall from "../../../api/protectedApiCall";

export async function deletePostComment(postId, commentId, accessToken, setAccessToken) {
  try {
    await protectedApiCall(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      setAccessToken,
    );

    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
