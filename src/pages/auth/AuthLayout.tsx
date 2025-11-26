import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="center max-w-sm w-full p-2">
    <div className="p-8 border-1 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-md w-full">
      <Outlet />
    </div>
    </div>
  );
};
