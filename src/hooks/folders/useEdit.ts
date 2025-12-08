import store from "@/state/store";
import { useAlerts } from "../useAlerts";
// import { generatedId } from "@/utils/generateId";

const api = import.meta.env.VITE_API;

export const useEdit = () => {
    const { alertError } = useAlerts()
    const setFolders = store.use.setFolders();
    const setChildrens = store.use.setChildrens();
    const setPath = store.use.setPath();
    const setIsLogin = store.use.setIsLogin()

    const setFoldersToState = (data: folder[], rootId: number) => {
        const folders = data.reduce((acc, user) => {
            const id = String(user.id)
            acc[id] = user;
            return acc;
        }, {} as objectFolder);

        const parent = folders[rootId]

        setFolders(folders);
        setChildrens(parent.childrens);
        setPath(parent);
    }

    const createMinStructure = () => {
        const folder = {
            id: 1,
            title: "Root",
            parent: null,
            childrens: [],
            ref: null,
        }

        setFolders({ folder });
        setChildrens([]);
        setPath(folder);
        setIsLogin(false)
    }

    const getUsersFolders = async () => {
        try {
            await fetch(api + "/folders/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token")
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    const token = localStorage.getItem("token")
                    if (!token) return
                    const payload = token.split(".")
                    const { userId } = JSON.parse(atob(payload[1]))
                    setFoldersToState(data, userId)
                });
        } catch (error) {
            alertError("get folders")
            createMinStructure()
            // console.log(error);
        }
    };

    const getTemplateFolders = async () => {
        try {
            await fetch(api + "/folders/template", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .then((data) => setFoldersToState(data.folders, data.rootId));
        } catch (error) {
            alertError("get folders")
            createMinStructure()
            // console.log(error);
        }
    };

    return { getUsersFolders, getTemplateFolders }
}