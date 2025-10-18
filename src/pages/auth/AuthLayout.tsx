import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="center max-w-sm w-full p-2">
    <div className=" p-8 bg-neutral-800 border-1 rounded-lg border-neutral-600 w-full">
      <Outlet />

    </div>
    </div>
  );
};
