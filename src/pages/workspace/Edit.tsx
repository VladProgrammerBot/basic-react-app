import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import store from "@/state/store";
import { Footer } from "./cards/footer";

import { Bar } from "./cards/Bar";
import { Messages } from "./cards/section/Messages";
import { useEdit } from "@/hooks/folders/useEdit";
import { Guide } from "./cards/Guide";

export const Edit = () => {
  const folders = store.use.folders();
  const isBarOpen = store.use.isBarOpen()
  const toggleBar = store.use.toggleBar()
  const closeBar = store.use.closeBar()
  const setIsLogin = store.use.setIsLogin()
  const setIsGuideOpen = store.use.setIsGuideOpen()
  const isGuideOpen = store.use.isGuideOpen()
  const { getUsersFolders, getTemplateFolders } = useEdit()

  useEffect(() => {
    closeBar()
    if (Object.keys(folders).length !== 0) return
    if (localStorage.getItem("token")) {
      setIsGuideOpen(false)
      setIsLogin(true)
      getUsersFolders();
    } else {
      setIsGuideOpen(true)
      setIsLogin(false)
      getTemplateFolders()
    }
  }, []);

  return (
    <div className="flex h-full min-h-screen">
      {Object.keys(folders).length === 0 ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <>
          {isBarOpen && <span onClick={toggleBar} className="fixed bg-black/30 w-screen h-screen top-0 right-0 z-100"></span>}
          <Bar />
          <Path />
          <div>

          </div>
          <div className="w-full max-w-4xl mx-auto flex flex-col justify-between">
            <Folders />
            <Footer />
          </div>
        </>
      )}
      <Messages />
      {isGuideOpen && <Guide />}
    </div>
  );
};
