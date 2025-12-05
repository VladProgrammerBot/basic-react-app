declare interface folder {
  id: number;
  title: string;
  parent: number | null;
  childrens: number[];
  ref: number | null;
}

declare interface alert {
  id: number
  text: string
  color: "red" | "blue" | "green"
}

declare type objectFolder = {
  [key: string]: folder
}