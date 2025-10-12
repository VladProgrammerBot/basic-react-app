import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const Input = ({ password }: { password?: boolean }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative w-fit">
      <input
        type={password && !visible ? "password" : "text"}
        className={`outline-none border-1 border-neutral-600 px-2 py-1 pr-10`}
      />
      {password && (
        <div
          onClick={() => setVisible(!visible)}
          className="absolute translate-y-1/2 text-xl bottom-1/2 right-3 cursor-pointer"
        >
          {visible ? <IoMdEye /> : <IoMdEyeOff />}
        </div>
      )}
    </div>
  );
};
