import store from "@/state/store";
const api = import.meta.env.VITE_API;

export const useItem = () => {
  const {
    folders,
    childrensId,
    setChildrens,
    pushPath,
    path,
    setParentChildrens,
    setRenameFolder,
    renameBuffer,
    setRenameBuffer
  } = store();
  
  const getFolderById = (id: string) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  const moveInto = (id: string) => {
    setParentChildrens(path.length - 1, childrensId);
    const newParent = getFolderById(id);
    if (!newParent) return;
    setChildrens(newParent.childrens);
    pushPath(newParent);
    window.scrollTo(0, 0);
  };

  const renameFolder = async (title: string) => {
    if (!renameBuffer) return
    setRenameFolder(renameBuffer, title)
    setRenameBuffer(null)

    try {
      await fetch(api + "/folders/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: renameBuffer,
          title: title,
          token: localStorage.getItem("token")
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    moveInto,
    renameFolder
  };
};
