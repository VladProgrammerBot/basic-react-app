import { Folders } from "./cards/Folders";
import { Panel } from "./cards/Panel";
import { Path } from "./cards/Path";

export const Edit = () => {
  return (
    <div className="h-screen flex">
      <div className="w-full md:w-fit h-full max-md:fixed">
        <Panel />
      </div>
      <div className="w-full px-2 space-y-4 max-md:pl-16">
        <Path />
        <Folders />
      </div>
    </div>
  );
};
