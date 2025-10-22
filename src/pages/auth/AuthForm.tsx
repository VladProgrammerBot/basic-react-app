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

export type authType = "Log in" | "Sign up";

export const AuthForm = ({ type }: { type: authType }) => {
  const { onSubmit, form } = useLogin(type);
  const navigate = useNavigate()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end gap-2">
          <Button type="button" variant={"outline"} onClick={() => navigate("/")}>Cancel</Button>
          <Button type="submit">{type}</Button>
        </div>
      </form>
    </Form>
  );
};
