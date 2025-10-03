import { Folders } from "./cards/Folders";
import { InputForm } from "./cards/InputForm";
import { Panel } from "./cards/Panel";
import { Path } from "./cards/Path";

export const Edit = () => {
  return (
    <div className="h-screen m-auto">
      <Path />
      <Panel />
      <Folders />
      <InputForm />
    </div>
  );
};
