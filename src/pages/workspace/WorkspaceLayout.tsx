import { useEdit } from "@/hooks/folders/useEdit";
import { Messages } from "./Components/Messages";
import { Workspace } from "./Workspace";

export const WorkspaceLayout = () => {
  const { thereAreFolders } = useEdit();

  return (
    <div className="p-2 max-w-xl mx-auto">
      {!thereAreFolders ? (
        <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
      ) : (
        <Workspace />
      )}
      <Messages />
    </div>
  );
};
