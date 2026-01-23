import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home/Home.tsx";
import { AuthLayout } from "./pages/auth/AuthLayout.tsx";
import { Edit } from "./pages/workspace/Edit.tsx";
import { AuthForm } from "./pages/auth/AuthForm.tsx";
import { About } from "./pages/about/About.tsx";
import { GlobalLayout } from "./pages/GlobalLayout.tsx";
import { Experements } from "./pages/experemental/Experement.tsx";
import { NGA } from "./pages/experemental/NewGuideAnim.tsx";
import { Guide } from "./pages/workspace/cards/Guide/Guide.tsx";
import { WithoutMarkdown } from "./pages/experemental/WithoutMarkdown.tsx";
import { OnluMD } from "./pages/experemental/OnlyMD.tsx";
import { SimpleMd } from "./pages/experemental/SimpleMd.tsx";
import { SimpleMd2 } from "./pages/experemental/SimpleMd2.tsx";
// import { Experements } from "./Experements.tsx";

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
        path: "workspace",
        Component: Edit,
      },
      {
        path: "experements",
        Component: Experements,
        children: [
          {
            path: "nga",
            Component: NGA,
          },
          {
            path: "guide",
            Component: Guide,
          },
          {
            path: "without-markdown",
            Component: WithoutMarkdown,
          },
          {
            path: "only-md",
            Component: OnluMD,
          },
          {
            path: "simple-md-1",
            Component: SimpleMd,
          },
          {
            path: "simple-md-2",
            Component: SimpleMd2,
          },
        ],
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
