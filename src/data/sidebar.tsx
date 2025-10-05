import { RiDeleteBinLine } from "react-icons/ri";
import { HiPencilAlt } from "react-icons/hi";
import { LuPencil, LuTextCursor } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoIosMove, IoMdMove } from "react-icons/io";
import { IoMdHelp } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const menu = [
    {
      icon: <RiDeleteBinLine fontSize={20}/>,
      title: "Remove",
      key: "ctrl+d",
    },
    {
      icon: <LuTextCursor fontSize={20}/>,
      title: "Change",
      key: "c",
    },
    {
      icon: <IoMdMove fontSize={20}/>,
      title: "Replace",
      key: "r",
    },
    {
      icon: <HiPencilAlt color="white" fontSize={20} />,
      title: "Add",
      key: "a",
    },
    {
      icon: <IoSearch color="white" fontSize={20}/>,
      title: "Search",
      key: "s",
    },
    {
      icon: <IoMdHelp fontSize={20}/>,
      title: "Help",
      key: "?",
    },
  ];

export const menuData = [
  <IoIosMove />,
  <FaAngleUp />,
  <FaAngleDown />,
  <LuPencil />,
  <RiDeleteBinLine />,
];