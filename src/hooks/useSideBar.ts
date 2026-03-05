import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import store from "@/state/store";
import { TiHome } from "react-icons/ti";
import { MdLogout, MdOutlineBorderStyle } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";

export const useBar = () => {
  const navigate = useNavigate();

  const setFolders = store.use.setFolders();
  const isLogin = store.use.isLogin();
  const setIsStyled = store.use.setIsStyled();
  const isStyled = store.use.isStyled();

  const [username, setUsername] = useState("");
  const [isBarOpen, setIsBarOpen] = useState(false)

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const [, payload] = token.split(".");
      const { username } = JSON.parse(atob(payload));
      setUsername(username ?? "");
    } catch {}
  }, []);

  const go = (path: string) => {
    navigate(path);
    setIsBarOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    setFolders({});
    navigate("/login");
    setIsBarOpen(false);
  };

  const actions = [
    {
      key: "home",
      label: "Home",
      icon: TiHome,
      show: true,
      onClick: () => go("/"),
    },
    {
      key: "logout",
      label: "Log out",
      icon: MdLogout,
      show: isLogin,
      onClick: logout,
    },
    {
      key: "signin",
      label: "Create account",
      icon: HiUserAdd,
      show: !isLogin,
      onClick: () => go("/signup"),
    },
    {
      key: "styles",
      label: "Pro mode",
      icon: MdOutlineBorderStyle,
      show: true,
      onClick: () => {
        localStorage.setItem("isNotStyled", String(!isStyled));
        setIsStyled();
      },
    },
  ];

  return {
    // containerClass
    isBarOpen,
    setIsBarOpen,
    username,
    actions,
  };
};
