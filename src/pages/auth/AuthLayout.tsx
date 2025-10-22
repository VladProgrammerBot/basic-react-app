import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="center max-w-sm w-full p-2">
    <div className=" p-8 bg-neutral-300 dark:bg-neutral-900 rounded-4xl w-full">
      <Outlet />
    </div>
    </div>
  );
};
