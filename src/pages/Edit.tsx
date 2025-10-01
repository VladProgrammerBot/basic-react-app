import { Folders } from "../cards/Folders";
import { Panel } from "../cards/Panel";
import { Path } from "../cards/Path";

export const Edit = () => {
  return (
    <div className="h-screen m-auto">
      <Path />
      <Panel />
      <Folders />
      <div className="w-full max-w-4xl max-lg:px-2 pb-2 fixed bottom-0 translate-x-1/2 right-1/2">
        <div className="bg-neutral-900 shadow-md p-2 shadow-black flex rounded-lg text-white">
          <input
            type="text"
            placeholder="Enter folder name"
            className="flex-1 px-2 outline-none rounded-md"
          />
          <button className="border-1 border-neutral-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-neutral-800 duration-200">Add</button>
        </div>
      </div>
    </div>
  );
};
