import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home/Home.tsx";
import { AuthLayout } from "./pages/auth/AuthLayout.tsx";
import { AuthForm } from "./pages/auth/AuthForm.tsx";
import { About } from "./pages/about/About.tsx";
import { GlobalLayout } from "./pages/GlobalLayout.tsx";
import { WorkspaceLayout } from "./pages/workspace/WorkspaceLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GlobalLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "experements",
        Component: WorkspaceLayout,
      },
      {
        path: "workspace",
        Component: WorkspaceLayout,
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
