import { createBrowserRouter, redirect } from "react-router";
import { Home } from "./pages/Home.tsx";
import { AuthLayout } from "./pages/auth/AuthLayout.tsx";
import { Edit } from "./pages/workspace/Edit.tsx";
import { AuthForm } from "./pages/auth/AuthForm.tsx";
import { About } from "./pages/about/About.tsx";
import { Layout } from "./pages/workspace/Layout.tsx";

const authMiddleware = () => {
  if (!localStorage.getItem("token")) throw redirect("/login");
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "workspace",
        middleware: [authMiddleware],
        Component: Edit,
      },
      {
        path: "about",
        Component: About,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            element: <AuthForm type="Log in" />,
          },
          {
            path: "signup",
            element: <AuthForm type="Sign up" />,
          },
        ],
      },
    ],
  },
]);
