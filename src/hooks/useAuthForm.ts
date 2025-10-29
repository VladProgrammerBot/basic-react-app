import type { authType } from "@/pages/auth/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const api = import.meta.env.VITE_API;

    try {
      await fetch(`${api}/auth/${type === "Log in" ? "login" : "signup"}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setIsLoading(false)
          localStorage.setItem("token", data)
          navigate("/workspace");
        });
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  return { form, onSubmit, isLoading };
};
