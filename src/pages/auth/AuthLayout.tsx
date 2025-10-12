import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="center p-8 bg-neutral-800 border-1 border-neutral-600">
      <Outlet />
    </div>
  );
};
