import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;

export const usePath = () => {
    const reducePath = store.use.reducePath();
    const setChildrens = store.use.setChildrens();
    const moveBuffer = store.use.moveBuffer();
    const setMoveFolder = store.use.setMoveFolder();
    const resetMoveBuffer = store.use.resetMoveBuffer();
    const removeChild = store.use.removeChild()
    const pushChildren = store.use.pushChildren();
    const path = store.use.path();
    const { alertError, useAlert } = useAlerts()
    const isLogin = store.use.isLogin()

    const moveOut = (childrens: number[], index: number) => {
        reducePath(index);
        setChildrens(childrens);
        window.scrollTo(0, 0);
    };

    const moveFolder = async () => {
        if (!moveBuffer) return
        const isPaste = moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id

        if (!isPaste) return useAlert({ color: "red", text: "You can`t paste folder here" })

        const futureParent = path[path.length - 1].id

        setMoveFolder(moveBuffer.id, moveBuffer.parent, futureParent)
        pushChildren(moveBuffer.id)
        removeChild(moveBuffer.id, moveBuffer.parent)
        resetMoveBuffer()

        if (!isLogin) return
        try {
            await fetch(api + "/folders/move", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: moveBuffer.id,
                    parentId: moveBuffer.parent,
                    future_parent: futureParent,
                    token: localStorage.getItem("token")
                })
            })
        } catch (error) {
            alertError("move folder")
            // console.log(error)
        }
    }

    return { moveFolder, moveOut };
};