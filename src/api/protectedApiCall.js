import refreshAccessToken from "./refreshAccessToken";

async function protectedApiCall(url, options, setAccessToken) {
  let newAccessToken;

  let response = await fetch(url, options);

  if (!response.ok) {
    const data = await response.json();

    // Validation error
    if (response.status === 400) {
      // Return validation error messages
      return data.error;
    }

    // Token/Unauthorized Errors
    else if (response.status === 401) {
      // Expired token error
      if (data.error.code === "TOKEN_EXPIRED") {
        // Try to get new accessToken
        try {
          newAccessToken = await refreshAccessToken();

          setAccessToken(newAccessToken);
        } catch (error) {
          if (error.status === 401) {
            // Refresh token invalid or expired
            setAccessToken(null);
            window.location.href = "/login";
            return;
          } else {
            throw error;
          }
        }

        // Update fetch options with newAccessToken
        const retryOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        // Try to recall original url with updated accessToken

        response = await fetch(url, retryOptions);

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 400) {
            return errorData.error;
          } else {
            const error = new Error(errorData.error.message);
            error.status = response.status;
            error.code = errorData.error.code;
            throw error;
          }
        }
      } else {
        // Unauthorized/Invalid token error
        setAccessToken(null);
        window.location.href = "/login";
        return;
      }
    } else {
      const error = new Error(data.error.message);
      error.status = response.status;
      error.code = data.error.code;
      throw error;
    }
  }
  // Successful API call
  return await response.json();
}

export default protectedApiCall;
