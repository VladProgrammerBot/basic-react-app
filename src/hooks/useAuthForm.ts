import type { authType } from "@/pages/auth/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useState } from "react";
import store from "@/state/store";
import { generatedId } from "@/utils/generateId";
import { fetchApi } from "./folders/useApi";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type authForm = z.infer<typeof formSchema>;

export const useLogin = (type: authType) => {
  const folders = store.use.folders();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const setFolders = store.use.setFolders();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const path = store.use.path();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsError(false);
    setIsLoading(true);

    await fetchApi({
      method: "POST",
      path: `/auth/${type === "Log in" ? "login" : "signup"}`,
      body: {
        ...values,
        folders,
        rootId: (path[0] && path[0].id) ?? generatedId(),
      },
      auth: false,
      onSuccess: (data) => {
        if (type === "Log in") setFolders({});
        setIsLoading(false);
        localStorage.setItem("token", data);
        navigate("/workspace");
      },
      onError: () => {
        setIsError(true);
        setIsLoading(false);
      },
    });
  }

  return { form, onSubmit, isLoading, isError };
};
