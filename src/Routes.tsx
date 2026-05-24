import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home/Home.tsx";
import { AuthLayout } from "./pages/auth/AuthLayout.tsx";
import { AuthForm } from "./pages/auth/AuthForm.tsx";
import Documentation from "./pages/about/About.tsx";
import { GlobalLayout } from "./pages/GlobalLayout.tsx";
import { Workspace } from "./pages/workspace/Workspace.tsx";
import { Analytics } from "./pages/admin/Analytics.tsx";

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
        path: "analytics",
        Component: Analytics,
      },
      {
        path: "workspace",
        Component: Workspace,
      },
      {
        path: "about",
        Component: Documentation,
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
