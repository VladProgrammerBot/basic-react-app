import store from "@/state/store"

export const useBreadcrumbs = () => {
    const path = store.use.path()

    const hiddenCrumbs = () => {
        const hiddenArr = []

        for (let i = 0; i < path.length; i++) {
            hiddenArr.push(path[i])
        }

        return hiddenArr
    }

    return { hiddenCrumbs }
}