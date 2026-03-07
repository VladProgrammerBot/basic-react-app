import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import store from "@/state/store";
import { TiHome } from "react-icons/ti";
import { MdLogout, MdOutlineBorderStyle } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import type { DesignMode } from "@/types/storeTypes";

const designModes: { value: DesignMode; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "withKeyTips", label: "Key tips" },
  { value: "Minimalistic", label: "Minimalistic" },
];

export const useBar = () => {
  const navigate = useNavigate();

  const setFolders = store.use.setFolders();
  const isLogin = store.use.isLogin();
  const designMode = store.use.designMode();
  const setDesignMode = store.use.setDesignMode();

  const [username, setUsername] = useState("");
  const [isBarOpen, setIsBarOpen] = useState(false)

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const [, payload] = token.split(".");
      const { username } = JSON.parse(atob(payload));
      setUsername(username ?? "");
    } catch {
      // Silently handle token parsing errors
    }
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
      label: "Design Mode",
      icon: MdOutlineBorderStyle,
      show: true,
      onClick: () => {},
      submenu: designModes.map((mode) => ({
        key: mode.value,
        label: mode.label,
        show: true,
        onClick: () => setDesignMode(mode.value),
        active: designMode === mode.value,
      })),
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
