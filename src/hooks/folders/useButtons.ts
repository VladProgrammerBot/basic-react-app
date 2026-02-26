import store from "@/state/store";

export const useButtons = () => {
    const setIdForNewConnection = store.use.setIdForNewConnection();
    const addConnection = store.use.addConnection();

    const handleAddConnection = (parentId: number, childId: number) => {
        setIdForNewConnection(null);
        addConnection(parentId, childId)
    }

    return { handleAddConnection }
}