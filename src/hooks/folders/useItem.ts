import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;

export const useItem = () => {
    const { alertError } = useAlerts();

    const path = store.use.path();
    const childrensId = store.use.childrensId();
    const renameBuffer = store.use.renameBuffer();

    const setParentChildrens = store.use.setParentChildrens();
    const setChildrens = store.use.setChildrens();
    const pushPath = store.use.pushPath();
    const setRenameFolder = store.use.setRenameFolder();
    const setRenameBuffer = store.use.setRenameBuffer();
    const setSelectedItemId = store.use.setSelectedItemId()
    const folders = store.use.folders()
    const isLogin = store.use.isLogin()

    const moveInto = (id: number, index: number) => {
        if (childrensId.length === 0) return
        setSelectedItemId(0 )
        setParentChildrens(path.length - 1, childrensId);
        const newParent = folders[id];
        if (!newParent) return;
        setChildrens(newParent.childrens);
        pushPath({...newParent, index});
        window.scrollTo(0, 0);
    };

    const renameFolder = async (title: string) => {
        if (!renameBuffer) return
        setRenameFolder(renameBuffer, title)
        setRenameBuffer(null)

        if (!isLogin) return
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
            // console.log(error)
        }
    }

    return { moveInto, renameFolder }
};
