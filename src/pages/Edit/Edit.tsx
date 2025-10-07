import { Buttons } from "./cards/Buttons";
import { Folders } from "./cards/Folders";
import { InputForm } from "./cards/InputForm";
import { Path } from "./cards/Path";
import stateFolders from "@/state/stateFolders";

export const Edit = () => {
  const { mode } = stateFolders();
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  return (
    <div className="max-w-4xl max-lg:px-2 mx-auto">
      <div className="">
        <Path />
        <Buttons />
      </div>
      <div className="h-full">
        <Folders />
      </div>
      {mode !== "normal" && <InputForm />}
    </div>
  );
};
