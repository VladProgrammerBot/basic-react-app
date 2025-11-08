import store from "@/state/store";

export const useItemMenuDB = () => {
    const DB = store.use.db()
    
    const removeFolderDB = (id: string, parent: string) => {
        if (!DB) return
        const transaction = DB.transaction("folders", "readwrite");
        let folders = transaction.objectStore("folders");

        let removeReq = folders.delete(id);

        removeReq.onsuccess = () => {
            let parentReq = folders.get(parent)

            parentReq.onsuccess = function () {
                folders.put({ ...parentReq.result, childrens: parentReq.result.childrens.filter((child: string) => child !== id) })
            };
        }
    };

    return { removeFolderDB }
}