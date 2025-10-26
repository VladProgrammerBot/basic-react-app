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
          <Path />
          <Bar />
          <div className="w-full px-2">
            <Folders />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};
