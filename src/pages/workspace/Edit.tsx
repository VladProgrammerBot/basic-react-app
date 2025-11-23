import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import store from "@/state/store";
import { Footer } from "./cards/footer";

import { Bar } from "./cards/Bar";
import { Alerts } from "./cards/section/Alerts";
import { useEdit } from "@/hooks/folders/useEdit";

export const Edit = () => {
  const folders = store.use.folders();
  const { getFolders } = useEdit()
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="flex h-full min-h-screen">
      {Object.keys(folders).length === 0 ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <>
          <Bar />
          <Path />
          <div className="w-full max-w-4xl mx-auto px-4 flex flex-col justify-between">
            <Folders />
            <Footer />
          </div>
        </>
      )}
      <Alerts />
    </div>
  );
};
