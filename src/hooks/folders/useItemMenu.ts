import store from "@/state/store";
const api = import.meta.env.VITE_API;

export const useItemMenu = () => {
  const {
    foldersRemove,
    childrensRemove,
  } = store();

  const removeFolder = async (id: number, parent: number) => {
    foldersRemove(id, parent);
    childrensRemove(id);

    try {
      await fetch(api + "/folders/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          token: localStorage.getItem("token")
        })
      })
    } catch (error) {
      console.log(error)
    }
  };

  return {
    removeFolder,
  };
};
