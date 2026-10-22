import MainLayout from "../components/layouts/MainLayout";
import App from "../App";
import NotFound from "../features/errors/NotFound/NotFound";
import Login from "../features/auth/components/Login/Login";
import SignUp from "../features/auth/components/SignUp/SignUp";
import UnauthenticatedOnlyLayout from "../components/layouts/UnauthenticatedOnlyLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      {
        element: <UnauthenticatedOnlyLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "sign-up", element: <SignUp /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
