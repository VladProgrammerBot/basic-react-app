// import store from "@/state/store";
import store from "@/state/store";
import { useState } from "react";

export const useDB = () => {
    const [openRequest] = useState(indexedDB.open("folders_db", 3));
    const setFolders = store.use.setFolders()
    const setChildrens = store.use.setChildrens()
    const setPath = store.use.setPath()

    openRequest.onupgradeneeded = function (event) {
        let db = openRequest.result;
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

    openRequest.onsuccess = function () {
        const db = openRequest.result

        let transaction = db.transaction("folders", "readonly");

        db.onversionchange = function () {
            db.close();
            alert("База даних застаріла, перезавантажте сторінку.")
        };

        let folders = transaction.objectStore("folders"); // (2)

        // const request = folders.clear()
        const request = folders.getAll()
        request.onsuccess = function () {
            const parent = request.result.find((folder) => folder.parent === null);

            console.log(parent)
            if (!parent) return;

            setFolders(request.result)
            setChildrens(parent.childrens);
            setPath(parent);
        };

        request.onerror = function () {
            console.log("Помилка", request.error);
        };
    }

    // function push() {
    //     const db = openRequest.result;
    //     const transaction = db.transaction("folders", "readwrite"); // (1)
    //     let folders = transaction.objectStore("folders"); // (2)

    //     let folder = {
    //         id: Math.random(),
    //         price: 10,
    //         created: new Date()
    //     };

    //     let request = folders.add(folder); // (3)

    //     request.onsuccess = function () { // (4)
    //         console.log("folders: ", request.result);
    //         // setData([...data, folder])
    //     };
    //     request.onerror = function () {
    //         console.log("Помилка", request.error);
    //     };
    // };

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

    return {}
}