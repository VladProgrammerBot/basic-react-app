import { AuthForm } from "./AuthForm";
import type { authForm } from "@/hooks/useAuthForm";
import { useNavigate } from "react-router";
import { useFolders } from "@/hooks/useFolders";

export const Signup = () => {
  const { setFirstState } = useFolders();
  const navigate = useNavigate();

  const submit = async (values: authForm) => {
    const api = import.meta.env.VITE_API_LOCAL;

    try {
      await fetch(api + "/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data: folder[]) => {
          setFirstState(data);
          navigate("/workspace");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm title="Sign up" descript="Create new account" submit={submit} />
  );
};
