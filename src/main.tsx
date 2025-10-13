import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "./pages/home/Home.tsx";
import { AuthLayout } from "./pages/auth/AuthLayout.tsx";
import { Login } from "./pages/auth/Login.tsx";

const authMiddleware = () => {
  if (!document.cookie) throw redirect("/login");
};

const router = createBrowserRouter([
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
        Component: App,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
