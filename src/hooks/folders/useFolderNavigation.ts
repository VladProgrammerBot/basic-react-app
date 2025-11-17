// useFolderNavigation.ts
import store from "@/state/store";

export const useFolderNavigation = () => {
  const { folders, path, setParentChildrens, setChildrens, pushPath, reducePath } = store();

  const getFolderById = (id: number) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  const moveInto = (id: number) => {
    const childrensId = path[path.length - 1]?.childrensId; // Потрібно отримати childrensId
    if (childrensId) {
        setParentChildrens(path.length - 1, childrensId);
    }
    const newParent = getFolderById(id);
    if (!newParent) return;
    setChildrens(newParent.childrens);
    pushPath(newParent);
    window.scrollTo(0, 0);
  };

  const moveOut = (data: folder, index: number) => {
    reducePath(index);
    setChildrens(data.childrens);
    window.scrollTo(0, 0);
  };

  return {
    getFolderById,
    moveInto,
    moveOut,
  };
};