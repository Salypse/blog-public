import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "./MainLayout";

function UnauthenticatedOnlyLayout() {
  const { authStatus } = useContext(AuthContext);

  // Redirect to homepage if user is logged in
  return authStatus === "authenticated" ? <Navigate to="/" /> : <Outlet />;
}

export default UnauthenticatedOnlyLayout;
