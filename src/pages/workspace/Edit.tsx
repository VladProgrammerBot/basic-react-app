import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import store from "@/state/store";

import { Bar } from "./cards/Bar";
import { Messages } from "./cards/section/Messages";
import { useEdit } from "@/hooks/folders/useEdit";

export const Edit = () => {
  const folders = store.use.folders();
  const isBarOpen = store.use.isBarOpen();
  const toggleBar = store.use.toggleBar();
  const closeBar = store.use.closeBar();
  const setIsLogin = store.use.setIsLogin();
  const setIsGuideOpen = store.use.setIsGuideOpen();
  const isStyled = store.use.isStyled();
  const setCurrentStep = store.use.setCurrentStep();
  const { getUsersFolders, getTemplateFolders } = useEdit();

  useEffect(() => {
    setCurrentStep(0);
    closeBar();
    if (Object.keys(folders).length !== 0) return;
    if (localStorage.getItem("token")) {
      setIsGuideOpen(false);
      setIsLogin(true);
      getUsersFolders();
    } else {
      setIsGuideOpen(true);
      setIsLogin(false);
      getTemplateFolders();
    }
  }, []);

  return (
    <div className="workspace flex h-full min-h-screen">
      {isStyled && (
        <>
          <div className="fixed -z-10 inset-0 hidden dark:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
          </div>
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none hidden dark:block">
            <div className="absolute -top-40 -right-40 w-120 h-120 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-120 h-120 bg-purple-500/10 rounded-full blur-3xl" />
          </div>
        </>
      )}
      {Object.keys(folders).length === 0 ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <>
          {isBarOpen && (
            <span
              onClick={toggleBar}
              className="fixed bg-black/20 dark:bg-black/30 w-screen h-screen top-0 right-0 z-90"
            ></span>
          )}
          <Bar />
          {/* <div className="max-w-4"></div> */}
          
          <Path />
          <div className="w-full max-w-4xl mx-auto flex flex-col justify-between">
            <Folders />
          </div>
          {/* {isGuideOpen && <Guide />} */}
        </>
      )}
      <Messages />
    </div>
  );
};
