import { createBrowserRouter, redirect } from "react-router";
import { Home } from "./pages/home/Home.tsx";
import { AuthLayout } from "./pages/auth/AuthLayout.tsx";
import { Login } from "./pages/auth/Login.tsx";
import { Edit } from "./pages/workspace/Edit.tsx";
import { Signup } from "./pages/auth/Signup.tsx";

const authMiddleware = () => {
  if (!document.cookie) throw redirect("/login");
};

export const router = createBrowserRouter([
  {
    path: "/",
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
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "signup",
            Component: Signup,
          },
        ],
      },
    ],
  },
]);
