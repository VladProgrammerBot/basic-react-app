import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="center max-w-xs w-full p-2">
      <Outlet />
    </div>
  );
};
