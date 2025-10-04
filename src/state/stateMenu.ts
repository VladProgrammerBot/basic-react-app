import { create } from "zustand";

type State = {
    openMenu: number | null
};

type Actions = {
  setMenuValue: (value: number | null) => void;
};

const stateMenu = create<State & Actions>((set) => ({
  openMenu: null,
  setMenuValue: (value) => set({ openMenu: value})
}));

export default stateMenu;
