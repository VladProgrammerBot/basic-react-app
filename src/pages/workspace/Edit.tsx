import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { Footer } from "./cards/footer";

import { Bar } from "./cards/Bar";

export const Edit = () => {
  const folders = store.use.folders();
  const { getFolders } = useFolders()
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="flex bg-indigo-600 bg-gradient-to-r from-violet-600 to-indigo-600 h-full min-h-screen">
      {folders.length === 0 ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <>
          <Bar />
          <Path />
          <div className="w-full max-w-4xl mx-auto px-2">
            <Folders />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};
