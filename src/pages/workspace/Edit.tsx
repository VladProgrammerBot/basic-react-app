import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import store from "@/state/store";
import { Bar } from "./cards/Bar";
import { Messages } from "./cards/section/Messages";
import { useEdit } from "@/hooks/folders/useEdit";
import { Guide } from "./cards/Guide/Guide";
import { GradientBackground } from "@/components/GradientBg";

export const Edit = () => {
  const folders = store.use.folders();
  const isBarOpen = store.use.isBarOpen();
  const toggleBar = store.use.toggleBar();
  const setIsLogin = store.use.setIsLogin();
  const isStyled = store.use.isStyled();
  const { getUsersFolders, getTemplateFolders } = useEdit();

  const thereAreFolders = Object.keys(folders).length === 0;
  const isUserLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!thereAreFolders) return;
    if (isUserLoggedIn) {
      setIsLogin(true);
      getUsersFolders();
      return;
    }
    setIsLogin(false);
    getTemplateFolders();
  }, []);

  return (
    <div className="workspace flex h-full min-h-screen">
      {isStyled && <GradientBackground />}
      {thereAreFolders ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <>
          {isBarOpen && (
            <span
              onClick={toggleBar}
              className="fixed backdrop-blur-sm bg-black/30 dark:bg-black/0 w-screen h-screen top-0 right-0 z-90"
            ></span>
          )}
          <Bar />
          <div className="flex w-full max-h-screen">
            <Guide />
            <div className="relative flex-1 w-full mx-auto flex flex-col justify-between">
              <Path />
              <div className="overflow-y-auto">
                <Folders />
              </div>
            </div>
          </div>
        </>
      )}
      <Messages />
    </div>
  );
};
