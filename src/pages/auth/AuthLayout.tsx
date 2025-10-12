import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="border-2 border-red-500 h-10 w-full">
      <Outlet />
    </div>
  );
};
