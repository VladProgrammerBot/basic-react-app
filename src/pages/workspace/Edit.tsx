import { useEffect, useState } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/header/Path";
import store from "@/state/store";
import { Footer } from "./cards/footer";

import { Bar } from "./cards/Bar";
import { Messages } from "./cards/section/Messages";
import { useEdit } from "@/hooks/folders/useEdit";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Edit = () => {
  const folders = store.use.folders();
  const isBarOpen = store.use.isBarOpen()
  const toggleBar = store.use.toggleBar()
  const { getFolders } = useEdit()
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  const [isGuideOpen, setIsGuideOpen] = useState(true)

  useEffect(() => {
    getFolders();
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
      {/* <div className="fixed bottom-4 left-4 p-1 gradient-bg rounded-full"><IoMdHelp fontSize={40} /></div> */}
      <div className="fixed bottom-0 sm:bottom-4 max-sm:w-full w-100 right-1/2 translate-x-1/2 border-t-1 sm:border-1 border-neutral-700 shadow-xl shadow-neutral-950 bg-neutral-800 p-2 text-center">
        <Button
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="w-full">
          {isGuideOpen ? <FaAngleDown /> : <FaAngleUp />}
        </Button>
        <div className={`space-y-4 overflow-hidden ${isGuideOpen ? "h-fit" : "h-0"}`}>
          <p className="font-bold text-2xl pt-2">Step 2 of 5</p>
          <img className="w-full aspect-4/2 object-cover" src="https://i.sstatic.net/Wgj7N.png" alt="" />
          <p>
            This program is a file system for text, you can navigate like in folders, try viewing the contents of the "plans" folder.
          </p>
          <div className="w-full flex justify-between">
            <Button>Prev</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
