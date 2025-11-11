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

    const moveFolderDB = async (id: string, parent: string, newParent: string) => {
        if (!DB) return
        const transaction = DB.transaction("folders", "readwrite");
        let folders = transaction.objectStore("folders");

        const getNewParent = folders.get(newParent);
        const getCurrent = folders.get(id);
        const getParent = folders.get(parent);

        getNewParent.onsuccess = () => {
            folders.put({ ...getNewParent.result, childrens: [...getNewParent.result.childrens, id] });
        }

        getCurrent.onsuccess = () => {
            folders.put({ ...getCurrent.result, parent: newParent })
        }

        getParent.onsuccess = () => {
            folders.put({ ...getParent.result, childrens: getParent.result.childrens.filter((child: string) => child !== id) })
        }
    };

    const importDataDB = async (parentId: string, data: folder[]) => {
        if (!DB) return
        const transaction = DB.transaction("folders", "readwrite");
        let folders = transaction.objectStore("folders");

        const getParReq = folders.get(parentId)
        getParReq.onsuccess = () => {
            const updateParReq = folders.put({
                ...getParReq.result, childrens: [...getParReq.result.childrens, parentId]
            })
            updateParReq.onsuccess = () => {
                data.forEach((elem: folder) => {
                    folders.add(elem)
                });
            }
        }
    };

    return { addFolderDB, moveFolderDB, importDataDB }
}