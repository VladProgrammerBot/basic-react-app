import { useEffect } from "react";
import { Buttons } from "./cards/Buttons";
import { Folders } from "./cards/Folders";
import { Path } from "./cards/Path";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";

export const Edit = () => {
  const path = store((state) => state.path);
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
