import store from "@/state/store";

export const useChildrens = () => {
  const folders = store.use.folders();
  const path = store.use.path();
  const mode = store.use.mode();
  const filteredElementsId = store.use.filteredElementsId();
  const currentFolder = folders[path[path.length - 1].id];

  if (mode === "Filter Result") return filteredElementsId;
  if (mode === "Backlinks") return currentFolder.backlinks;
  if (!currentFolder) return [];
  return currentFolder.childrens;
};
