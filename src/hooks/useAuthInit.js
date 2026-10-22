import { useState, useEffect } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import getUserData from "../api/getUserData";

export function useAuthInit() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("loading");
  const [accessToken, setAccessToken] = useState("null");

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setAuthStatus("loading");

    try {
      const accessToken = await refreshAccessToken();
      const userData = await getUserData(accessToken);

      // Update state after both requests succeed
      setAccessToken(accessToken);
      setUser(userData);
      setAuthStatus("authenticated");
    } catch (error) {
      console.error(
        `User authentication failed (${error.status || "Network error"}): ${error.message}`,
      );

      if (error.status === 401) {
        setUser(null);
        setAuthStatus("unauthenticated");
        setAccessToken(null);
      } else {
        setAuthStatus("error");
      }
    }
  };

  const logout = async () => {
    setAuthStatus("loading");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        { method: "POST", credentials: "include" },
      );

      if (!response.ok) {
        console.error(
          `Logout request failed: ${refreshResponse.status} - ${refreshResponse.statusText}`,
        );
      }

      setUser(null);
      setAccessToken(null);
      setAuthStatus("unauthenticated");
    } catch (error) {
      console.error(`Logout request error: ${error.name} - ${error.message}`);
      setAuthStatus("error");
    }
  };

  return {
    user,
    authStatus,
    accessToken,
    setAccessToken,
    initializeAuth,
    logout,
  };
}
