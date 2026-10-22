async function getUserData(accessToken) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = new Error("User request failed.");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.data.user;
}

export default getUserData;
