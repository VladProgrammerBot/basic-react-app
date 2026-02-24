import store from "@/state/store";

export const useChildrens = () => {
    const folders = store.use.folders();
    const path = store.use.path();

    const currentFolder = folders[path[path.length - 1].id];
    const childrensId = currentFolder ? currentFolder.childrens : [];

  return childrensId;
}