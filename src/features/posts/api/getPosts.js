export async function getPosts() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);

    if (!response.ok) {
      throw new Error("Failed to retrieve posts.");
    } else {
      const data = await response.json();
      return data.data.posts;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
