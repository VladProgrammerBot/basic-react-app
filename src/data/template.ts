export const childrens = [
  {
    id: 1,
    title: "Root",
    parent: 1,
    childrens: [3, 4, 6, 5],
  },
  {
    id: 3,
    title: "front-end",
    parent: 2,
    childrens: [],
  },
  {
    id: 4,
    title: "Back-end",
    parent: 2,
    childrens: [7, 8, 9],
  },
  {
    id: 5,
    title: "devOps",
    parent: 2,
    childrens: [],
  },
  {
    id: 6,
    title:
      "there is more examples than one, but thats not a problem, for example i can make a lot of jumps and don`t cry like baby:)",
    parent: 2,
    childrens: [4],
  },
  {
    id: 7,
    title:
      "auth",
    parent: 4,
    childrens: [],
  },
  {
    id: 8,
    title:
      "express",
    parent: 4,
    childrens: [10],
  },
  {
    id: 9,
    title:
      "postgres",
    parent: 4,
    childrens: [],
  },
  {
    id: 10,
    title:
      "middleware",
    parent: 8,
    childrens: [],
  },
] as folder[];
