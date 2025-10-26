import { useEffect } from "react";
import { Folders } from "./cards/section/Folders";
import { Path } from "./cards/Path";
import { useFolders } from "@/hooks/useFolders";
import store from "@/state/store";
import { Footer } from "./cards/footer";

import { Bar } from "./cards/Bar";

export const Edit = () => {
  const path = store.use.path();
  const { getFolders } = useFolders()
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="flex">
      {path.length === 0 ? (
        <p className="p-4">
          Loading...
        </p>
      ) : (
        <>
          <Bar />
          <div className="flex-1 flex flex-col max-w-full h-screen">
            <div className="p-2 w-full">
              <Path />
            </div>
            <div className="overflow-auto relative">
              <div className="max-w-4xl text-lg max-xl:px-2 mx-auto ">
                <Folders />
                <Footer />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
