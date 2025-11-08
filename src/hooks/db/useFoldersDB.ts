import store from "@/state/store";

export const useFoldersDB = () => {
    const DB = store.use.db()
    
    const addFolderDB = (newFolder: folder) => {
        if (!DB) return
        const transaction = DB.transaction("folders", "readwrite");
        let folders = transaction.objectStore("folders");

        let pushReq = folders.add(newFolder);

        pushReq.onsuccess = () => {
            let getReq = folders.get(newFolder.parent)

            getReq.onsuccess = function () {
                folders.put({ ...getReq.result, childrens: [...getReq.result.childrens, newFolder.id] })
            };
        }
    };

    return { addFolderDB }
}