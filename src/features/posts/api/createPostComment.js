import protectedApiCall from "../../../api/protectedApiCall";

export async function createPostComment(
  postId,
  formProps,
  accessToken,
  setAccessToken,
  setComments,
) {
  try {
    const response = await protectedApiCall(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
      {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-type": "application/json" },
        body: JSON.stringify(formProps),
      },
      setAccessToken,
    );

    if (response.errors) {
      return response;
    }

    // Add new comment to comments component
    setComments((prevComments) => [...prevComments, response.data.comment]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
