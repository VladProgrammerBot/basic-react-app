import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import store from "@/state/store";

import { Bar } from "./cards/Bar";
import { Messages } from "./cards/section/Messages";
import { useEdit } from "@/hooks/folders/useEdit";
import { Guide } from "./cards/Guide/Guide";
import { GradientBackground } from "@/components/GradientBg";
// import { Guide } from "@/pages/workspace/cards/Guide/Guide";

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
          <GradientBackground />
        </>
      )}
      {Object.keys(folders).length === 0 ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <>
          {isBarOpen && (
            <span
              onClick={toggleBar}
              className="fixed backdrop-blur-sm w-screen h-screen top-0 right-0 z-90"
            ></span>
          )}
          <Bar />
          {/* <div className="max-w-4"></div> */}
          <div className="flex w-full max-h-screen">
            <Guide />
            <div className="relative flex-1 w-full mx-auto flex flex-col justify-between">
              <Path />
              <div className="overflow-y-auto">
                <Folders />
              </div>
            </div>
          </div>
          {/* {isGuideOpen && <Guide />} */}
        </>
      )}
      <Messages />
    </div>
  );
};
