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
  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-center">
        <div className="space-y-2 text-center ">
          <p className="text-4xl mb-4">{type}</p>
          <p className="text-md cursor-pointer underline underline-offset-2">
            {type === "Log in" ? (
              <NavLink to={"/signup"}>Create new account</NavLink>
            ) : (
              <NavLink to={"/login"}>Login into account</NavLink>
            )}
          </p>
        </div>
        {isError && <p className="text-red-500 text-lg">Failed to {type}</p>}
        <div className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mx-auto">Username:</FormLabel>
                <FormControl className="text-center">
                  <Input placeholder="Enter username" {...field} ref={ref} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-center mx-auto">Password:</FormLabel>
                <FormControl className="text-center">
                  <Input
                    placeholder="Enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-center gap-2">
          <Button
            type="button"
            variant={"outline"}
            className="flex-1"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          {isLoading ? (
            <Button className="flex-1" variant={"disactive"} type="submit">
              <span className="auth-loader"></span>
              {type}
            </Button>
          ) : (
            <Button type="submit" className="flex-1">
              {type}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
