import store from "@/state/store";
import { fetchApi } from "./useApi";

export const useButtons = () => {
    // const setIdForNewConnection = store.use.setIdForNewConnection();
    const addConnection = store.use.addConnection();
    const folders = store.use.folders();

    const handleAddConnection = async (id: number, childId: number) => {
        if (folders[id].childrens.includes(childId) || id === childId) return;
        // setIdForNewConnection(null);
        addConnection(id, childId)

        await fetchApi({
            method: "POST",
            path: "/folders/add-connection",
            body: {
                id,
                childId,
            },
            auth: true
        })
    }

    return { handleAddConnection }
}