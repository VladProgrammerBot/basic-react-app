import stateFolders from "@/state/stateFolders";
import { AuthForm } from "./AuthForm";
import type { authForm } from "@/hooks/useAuthForm";
import { useNavigate } from "react-router";

export const Login = () => {
  const { setFolders, setChildrens, pushPath } = stateFolders();
  const navigate = useNavigate();

  const submit = async (values: authForm) => {
    const api = import.meta.env.VITE_API_LOCAL;

    try {
      await fetch(api + "/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data: folder[]) => {
          const parent = data.find((folder) => folder.parent === null);

          if (!parent) return;

          setFolders(data);
          pushPath(parent);
          setChildrens(parent.childrens);
          navigate("/workspace");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm title="Log In" submit={submit} />;
};
