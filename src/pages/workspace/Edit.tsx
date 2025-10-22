import { useEffect } from "react";
import { Buttons } from "./cards/Buttons";
import { Folders } from "./cards/Folders";
import { InputForm } from "./cards/InputForm2";
import { Path } from "./cards/Path";
import stateFolders from "@/state/stateFolders";
import { useFolders } from "@/hooks/useFolders";

export const Edit = () => {
  const { mode, path } = stateFolders();
  const { getFolders } = useFolders()
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="">
      {path.length === 0 ? (
        <p className="p-2">
          Loading...
        </p>
      ) : (
        <>
          <Path />
          <div className="max-w-4xl text-lg max-lg:px-2 mx-auto space-y-2">
            <Buttons />
            <Folders />
          </div>
        </>
      )}      
    </div>
  );
};
