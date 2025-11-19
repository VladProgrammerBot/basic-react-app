import store from "@/state/store";

export const usePath = () => {
    const reducePath = store.use.reducePath();
    const setChildrens = store.use.setChildrens();

    const moveOut = (data: folder, index: number) => {
        reducePath(index);
        setChildrens(data.childrens);
        window.scrollTo(0, 0);
    };

    return { moveOut };
};