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

        const req = indexedDB.open("folders_db", 5)
        
        req.onupgradeneeded = function () {
            let db = req.result;

            if (!db.objectStoreNames.contains('folders')) {
                db.createObjectStore('folders', { keyPath: 'id' });

                let transaction = db.transaction("folders", "readwrite");
                let folders = transaction.objectStore("folders");
                const reqa = folders.clear()

                reqa.onsuccess = () => {

                    folders.add({
                        id: 6,
                        parent: null,
                        childrens: [],
                        title: "Root"
                    })
                }
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

                console.log(JSON.stringify(request.result))
                setFolders(request.result)
                setChildrens(parent.childrens);
                setPath(parent);
            };

            request.onerror = function () {
                console.log("Помилка", request.error);
            };
        }
    }, [DB])

    return
}