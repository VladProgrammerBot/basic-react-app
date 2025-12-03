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
  const [currentStep, setCurrentStep] = useState(1)
  const basicGuide = [
    {
      img: "https://i.sstatic.net/Wgj7N.png",
      text: 'This program is a file system for text, you can navigate like in folders, try viewing the contents of the "plans" folder.'
    },
    {
      img: "https://i.sstatic.net/Wgj7N.png",
      text: <div>
        <p className="text-green-500 text-xl font-bold">You done!</p> now you can use it for remembering all you want. But if you want more visit <a href="">official documentation</a>
      </div>
    }
  ]

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
      <div className="fixed bottom-0 sm:bottom-4 max-sm:w-full w-100 right-1/2 translate-x-1/2 border-t-1 sm:border-1 border-neutral-700 shadow-xl shadow-neutral-950 bg-neutral-800 p-2 text-center">
        <Button
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="w-full">
          {isGuideOpen ? <FaAngleDown /> : <FaAngleUp />}
        </Button>
        <div className={`space-y-4 overflow-y-hidden ${isGuideOpen ? "h-90 max-h-90" : "h-0"}`}>
          <p className="font-bold text-2xl pt-2">Step {typeof currentStep === "number" && currentStep} of {basicGuide.length}</p>
          <img className="w-full aspect-4/2 h-45" src={basicGuide[currentStep - 1].img} alt="" />
          <p className="flex justify-center w-full">
            {basicGuide[currentStep - 1].text}
          </p>
        </div>
        {isGuideOpen && (
          <div className="w-full flex justify-between pt-2">
            <span>{currentStep > 1 && <Button onClick={() => setCurrentStep(prev => prev -= 1)}>Prev</Button>}</span>
            <span>{currentStep < basicGuide.length && <Button onClick={() => setCurrentStep(prev => prev += 1)}>Next</Button>}</span>
          </div>
        )}
      </div>
    </div>
  );
};
