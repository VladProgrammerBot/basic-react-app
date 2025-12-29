import { IoIosArrowUp } from "react-icons/io";

export const Tip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`animate-updown flex flex-col absolute top-full bg-blue-500 text-white z-10 backdrop-blur-xs px-4 py-2 rounded-lg ${className}`}>
      <IoIosArrowUp className="text-xl" />
      <p>{text}</p>
    </div>
  );
};
