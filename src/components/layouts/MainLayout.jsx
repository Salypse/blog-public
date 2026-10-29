import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar.jsx";
import { AuthContext } from "./AuthContext.jsx";
import { useAuthInit } from "../../hooks/useAuthInit.js";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage.jsx";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";

function MainLayout() {
  const { user, authStatus, accessToken, setAccessToken, initializeAuth, logout } = useAuthInit();

  return (
    <AuthContext
      value={{
        user,
        authStatus,
        accessToken,
        setAccessToken,
        initializeAuth,
        logout,
      }}
    >
      <Navbar />
      {authStatus === "loading" ? (
        <LoadingSpinner />
      ) : authStatus === "error" ? (
        <ErrorMessage onClick={initializeAuth} />
      ) : (
        <Outlet />
      )}
    </AuthContext>
  );
}

export default MainLayout;
