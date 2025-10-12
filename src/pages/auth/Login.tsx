import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";

export const Login = () => {
  return (
    <div className="space-y-6">
      <p className="text-3xl">Log In</p>
      <div>
        <p>Username</p>
        <Input />
        <p className="mt-2">Password</p>
        <Input password />
      </div>
      <Button>Log in</Button>
    </div>
  );
};
