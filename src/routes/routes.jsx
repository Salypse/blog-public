import MainLayout from "../components/layouts/MainLayout";
import NotFound from "../features/errors/NotFound/NotFound";
import Login from "../features/auth/components/Login/Login";
import SignUp from "../features/auth/components/SignUp/SignUp";
import UnauthenticatedOnlyLayout from "../components/layouts/UnauthenticatedOnlyLayout";
import PostsPage from "../features/posts/pages/PostsPage";
import PostPage from "../features/posts/pages/PostPage";

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
      { path: "posts/:id", element: <PostPage /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
