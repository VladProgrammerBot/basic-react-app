import { Folders } from "./cards/Folders";
import { Path } from "./cards/Path";

export const Edit = () => {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  return (
    <div className="h-screen">
      <Path />
      <Folders />
    </div>
  );
};
