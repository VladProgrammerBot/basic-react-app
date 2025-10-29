import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="center max-w-sm w-full p-2">
    <div className="p-8 border-1 border-neutral-300 dark:border-neutral-800 rounded-4xl w-full">
      <Outlet />
    </div>
    </div>
  );
};
