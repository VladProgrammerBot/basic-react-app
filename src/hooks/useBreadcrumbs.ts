import store from "@/state/store"

export const useBreadcrumbs = () => {
    const path = store.use.path()

    const hiddenCrumbs = () => {
        const hiddenArr = []

        for (let i = 0; i < path.length - 3; i++) {
            hiddenArr.push(path[i + 1])
        }

        return hiddenArr
    }

    const lastCrumbs = () => {
        const visibleArr = []

        for (let i = path.length - 2; i < path.length; i++) {
            if (i > 0) {
                visibleArr.push(path[i])
            }
        }

        return visibleArr
    }

    return { hiddenCrumbs, lastCrumbs }
}