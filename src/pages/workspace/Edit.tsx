import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { Footer } from "./cards/footer";
import { IoMdAlert } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

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
    <div className="flex h-full min-h-screen">
      {folders.length === 0 ? (
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
      <div className="p-2 fixed bottom-0 z-20 right-0">

      <div className="flex p-4 items-center animate-fade-in gap-2 border-1  rounded-md border-green-500 bg-green-800/90">
        <IoMdAlert className="text-xl" />
        <p className="text-sm flex-1 mr-4 sm:mr-8">Folder Added success, now you can move inside it</p>
        <button className="cursor-pointer">
          <IoMdClose />
        </button>
      </div>
      </div>
    </div>
  );
};
