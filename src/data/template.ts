import type { folder } from "../types/folder";

export const parent = {
  id: 2,
  title: "Parent",
  parent: 1,
  childrens: [3, 4, 6, 5],
} as folder;

export const childrens = [
  {
    id: 3,
    title: "front-end",
    parent: 2,
    childrens: [],
  },
  {
    id: 4,
    title: "back-end",
    parent: 2,
    childrens: [6],
  },
  {
    id: 5,
    title: "devOps",
    parent: 2,
    childrens: [],
  },
  {
    id: 6,
    title: "there is more examples than one, but thats not a problem, for example i can make a lot of jumps and don`t cry like baby:)",
    parent: 2,
    childrens: [],
  }
] as folder[];
