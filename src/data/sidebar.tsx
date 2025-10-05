import { RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { IoIosMove } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const menu = () => {
  const data = [
  {
    icon: <FaAngleUp />,
    title: "move up",
    key: "shift+k",
  },
  {
    icon: <FaAngleDown />,
    title: "move down",
    key: "shift+j",
  },
  {
    icon: <RiDeleteBinLine />,
    title: "remove",
    key: "shift+r",
  },
];
  return data 
}

export const menuData = [
  <IoIosMove />,
  <FaAngleUp />,
  <FaAngleDown />,
  <LuPencil />,
  <RiDeleteBinLine />,
];
