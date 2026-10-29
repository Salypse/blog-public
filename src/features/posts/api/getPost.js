export async function getPost(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to retrieve post");
    } else {
      const data = await response.json();
      return data.data.post;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
