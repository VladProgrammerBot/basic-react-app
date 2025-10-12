import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "./pages/home/Home.tsx";

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
        Component: App,
      },
      {
        path: "auth",
        element: <div>auth</div>
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
