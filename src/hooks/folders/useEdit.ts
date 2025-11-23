import store from "@/state/store";
import { useAlerts } from "../useAlerts";

const api = import.meta.env.VITE_API;

export const useEdit = () => {
    const { useAlert, alertError } = useAlerts()
    const setFolders = store.use.setFolders();
    const setChildrens = store.use.setChildrens();
    const setPath = store.use.setPath();

    const getFolders = async () => {
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
                .then((data: folder[]) => {
                    const folders = data.reduce((acc, user) => {
                        const id = String(user.id)
                        acc[id] = user;
                        return acc;
                    }, {} as objectFolder);

                    const token = localStorage.getItem("token")
                    if (!token) return
                    const payload = token.split(".")
                    const { userId } = JSON.parse(atob(payload[1]))

                    const parent = folders[userId]


                    // const parent = data.find((folder) => folder.parent === null);

                    // if (!parent) return;

                    setFolders(folders);
                    setChildrens(parent.childrens);
                    setPath(parent);

                    useAlert({
                        color: "green",
                        text: `Try to add your first folder`
                    })
                });
        } catch (error) {
            alertError("get folders")
            console.log(error);
        }
    };

    return { getFolders }
}