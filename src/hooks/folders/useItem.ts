import store from "@/state/store";
import { useAlerts } from "../useAlerts";
import { useChildrens } from "./useChildrens";
const api = import.meta.env.VITE_API;

export const useItem = () => {
    const { alertError, useAlert } = useAlerts();

    const path = store.use.path();
    // const childrensId = store.use.childrensId();
    const childrensId = useChildrens()
    const renameBuffer = store.use.renameBuffer();
    const setMode = store.use.setMode();

    const setParentChildrens = store.use.setParentChildrens();
    // const setChildrens = store.use.setChildrens();
    const pushPath = store.use.pushPath();
    const setRenameFolder = store.use.setRenameFolder();
    const setRenameBuffer = store.use.setRenameBuffer();
    const folders = store.use.folders()
    const isGuideOpen = store.use.isLogin()

    const moveInto = (id: number, index: number) => {
        if (childrensId.length === 0) return
        const newParent = folders[id];
        if (!newParent) return useAlert({ color: "red", text: "Folder not found" });
        setParentChildrens(path.length - 1, childrensId);

        setMode("normal");
        // setChildrens(newParent.childrens);
        pushPath({ ...newParent, index });
        window.scrollTo(0, 0);
    };

    const renameFolder = async (title: string) => {
        if (!renameBuffer) return
        setRenameFolder(renameBuffer, title)
        setRenameBuffer(null)

        if (!isGuideOpen) return
        try {
            await fetch(api + "/folders/rename", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: renameBuffer,
                    title: title,
                    token: localStorage.getItem("token")
                })
            })
        } catch (error) {
            alertError("rename folder")
        }
    }

    return { moveInto, renameFolder }
};
