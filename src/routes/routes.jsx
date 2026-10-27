import MainLayout from "../components/layouts/MainLayout";
import NotFound from "../features/errors/NotFound/NotFound";
import Login from "../features/auth/components/Login/Login";
import SignUp from "../features/auth/components/SignUp/SignUp";
import UnauthenticatedOnlyLayout from "../components/layouts/UnauthenticatedOnlyLayout";
import PostsPage from "../features/posts/pages/PostsPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <PostsPage /> },
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
