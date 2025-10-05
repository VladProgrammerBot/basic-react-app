import { Folders } from "./cards/Folders";
import { Path } from "./cards/Path";

export const Edit = () => {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  return (
    <div className="h-screen max-w-4xl mx-auto">
      <Path />
      <Folders />
    </div>
  );
};
