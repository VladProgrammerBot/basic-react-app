import store from "@/state/store";
import { useEffect } from "react";

export const useDB = () => {
    const setFolders = store.use.setFolders()
    const setChildrens = store.use.setChildrens()
    const setPath = store.use.setPath()
    const DB = store.use.db()
    const setDB = store.use.setDB()

    useEffect(() => {
        if (DB) return

        const req = indexedDB.open("folders_db", 3)

        req.onupgradeneeded = function () {
            let db = req.result;
            if (!db.objectStoreNames.contains('folders')) {
                db.createObjectStore('folders', { keyPath: 'id' });

                let transaction = db.transaction("folders", "readwrite");
                let folders = transaction.objectStore("folders"); // (2)

                folders.add({
                    id: 1,
                    parent: null,
                    childrens: [],
                    title: "Root"
                })
            }
        };

        req.onsuccess = function () {
            const db = req.result
            setDB(req.result)

            let transaction = db.transaction("folders", "readonly");

            db.onversionchange = function () {
                db.close();
                alert("База даних застаріла, перезавантажте сторінку.")
            };

            let folders = transaction.objectStore("folders");

            const request = folders.getAll()

            request.onsuccess = function () {
                const parent = request.result.find((folder) => folder.parent === null);

                if (!parent) return;

                setFolders(request.result)
                setChildrens(parent.childrens);
                setPath(parent);
            };

            request.onerror = function () {
                console.log("Помилка", request.error);
            };
        }
    }, [DB])

    function pushDB(newFolder: folder) {
        const transaction = DB.transaction("folders", "readwrite");
        let folders = transaction.objectStore("folders");

        let request = folders.add(newFolder);

        request.onsuccess = function () {
            console.log("folders: ", request.result);
        };
        request.onerror = function () {
            console.log("Помилка", request.error);
        };
    };

    const pushChildrenDB = (parentId: number, childId: number) => {
        const transaction = DB.transaction("folders", "readwrite");
        let folders = transaction.objectStore("folders");

        let parent = folders.get(parentId)

        parent.onsuccess = function () {
            let putReq = folders.put({ ...parent.result, childrens: [...parent.result.childrens, childId] })

            putReq.onsuccess = () => {
                console.log("success")
            }
            putReq.onerror = () => {
                console.log("error")
            }
            // console.log("parent: ", parent.result);
            // setData([...data, folder])
        };
        parent.onerror = function () {
            console.log("Помилка", parent.error);
        };
    };

    // function remove() {
    //     let db = openRequest.result;
    //     let transaction = db.transaction("folders", "readwrite"); // (1)
    //     let folders = transaction.objectStore("folders"); // (2)

    //     let request = folders.delete(data[data.length - 1].id); // (3)

    //     request.onsuccess = function () { // (4)
    //         console.log("removed: ", request.result);
    //         // setData(data.filter((_, index) => index !== data.length - 1))
    //     };
    //     request.onerror = function () {
    //         console.log("Помилка", request.error);
    //     };
    // };

    return { pushChildrenDB, pushDB }
}