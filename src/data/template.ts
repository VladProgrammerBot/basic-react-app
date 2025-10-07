export const childrens = [
  {
    id: 1,
    title: "Root",
    parent: null,
    childrens: [3, 4, 6, 5],
  },
  {
    id: 3,
    title: "front-end",
    parent: 1,
    childrens: [],
  },
  {
    id: 4,
    title: "Back-end",
    parent: 1,
    childrens: [7, 8, 9],
  },
  {
    id: 5,
    title: "devOps",
    parent: 1,
    childrens: [],
  },
  {
    id: 6,
    title:
      "TOUCH SUPPORT examples than one, but thats not a problem, for example i can make a lot of jumps and don`t cry like baby:)",
    parent: 1,
    childrens: [11],
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
  {
    id: 11,
    title:
      "this is a lot of text, i know",
    parent: 6,
    childrens: [12],
  },
  {
    id: 12,
    title:
      "but i have an idea",
    parent: 11,
    childrens: [13],
  },
  {
    id: 13,
    title:
      "how about middleware?",
    parent: 12,
    childrens: [14],
  },
  {
    id: 14,
    title:
      "that`s it!!!",
    parent: 13,
    childrens: [],
  },
] as folder[];
