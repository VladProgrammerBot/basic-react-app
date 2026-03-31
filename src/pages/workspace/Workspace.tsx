import { Messages } from "./Components/Messages";
import { Header } from "./Components/Header";
import { WorkspaceContent } from "./WorkspaceContent";
import { useWorkspace } from "@/hooks/folders/useWorkspace";

export const Workspace = () => {
  const { thereAreFolders } = useWorkspace();
  const loader = (
    <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div>
  );

  return (
    <div className="p-2 max-w-xl mx-auto">
      {thereAreFolders ? (
        <>
          <Header />
          <WorkspaceContent />
        </>
      ) : (
        loader
      )}
      <Messages />
    </div>
  );
};
