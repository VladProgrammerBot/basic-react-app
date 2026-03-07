import store from "@/state/store";
import { fetchApi } from "./useApi";

export const useButtons = () => {
  const addConnection = store.use.addConnection();
  const folders = store.use.folders();
  const resetMoveBuffer = store.use.resetMoveBuffer();
  const moveBuffer = store.use.moveBuffer();
  const path = store.use.path();

  const handleAddConnection = async () => {
    if (!moveBuffer) return;
    const childId = moveBuffer.id;
    const id = path[path.length - 1].id;
    if (!childId) return;
    if (folders[id].childrens.includes(childId) || id === childId) return;
    resetMoveBuffer();
    addConnection(id, childId);

    await fetchApi({
      method: "POST",
      path: "/folders/add-connection",
      body: {
        id,
        childId,
      },
      auth: true,
    });
  };

  return { handleAddConnection };
};
