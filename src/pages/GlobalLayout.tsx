import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/workspace");
  }, []);

  return <Outlet />;
};
