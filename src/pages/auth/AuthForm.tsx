import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/hooks/useAuthForm";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useRef } from "react";

export type authType = "Log in" | "Sign up";

export const AuthForm = ({ type }: { type: authType }) => {
  const { onSubmit, form, isLoading, isError } = useLogin(type);
  const navigate = useNavigate()

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <p className="text-4xl">{type}</p>
          <p className="text-md cursor-pointer  underline underline-offset-2">
            {type === "Log in" ? (
              <NavLink to={"/signup"}>Create new account</NavLink>
            ) : (

              <NavLink to={"/login"}>
                Login into account
              </NavLink>
            )}
          </p>
        </div>
        {isError && <p className="text-red-500 text-lg">Failed to {type}</p>}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username..." {...field} ref={ref} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter some password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end gap-2">
          <Button type="button" variant={"outline"} onClick={() => navigate("/")}>Cancel</Button>
          {isLoading ? (
            <Button variant={"disactive"} type="submit"><span className="auth-loader"></span>{type}</Button>
          ) : (
            <Button type="submit">{type}</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
