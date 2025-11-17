declare interface folder {
  id: number;
  title: string;
  parent: number;
  childrens: number[];
  ref: number | null;
}

declare interface alert {
  id: number
  text: string
  color: "red" | "blue" | "green"
}