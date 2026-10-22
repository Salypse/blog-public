async function refreshAccessToken() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("Refresh request failed.");
    error.status = response.status;
    throw error;
  }
  // Valid response return accessToken
  const data = await response.json();
  return data.data.accessToken;
}

export default refreshAccessToken;
