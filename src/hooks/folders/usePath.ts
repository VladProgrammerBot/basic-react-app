import store from "@/state/store";

export const usePath = () => {
  const {
    folders,
    setChildrens,
    reducePath,
  } = store();

  const getFolderById = (id: number) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  const moveOut = (data: folder, index: number) => {
    reducePath(index);
    setChildrens(data.childrens);
    window.scrollTo(0, 0);
  };

  return {
    getFolderById,
    moveOut,
  };
};
