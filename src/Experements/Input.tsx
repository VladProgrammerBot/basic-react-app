import { Hotkey } from "./HotKeyTip"

export const Input = () => {
    return (
        <div className="border border-white/20 rounded-xl border-dashed flex items-center w-full mt-1 ">
        <Hotkey className="ml-2" is="A" />
        <input
          className="outline-none w-full placeholder:text-white/30 px-4 py-2 flex-1"
          placeholder="Add note and connect to it"
        />
          <button className="py-1 px-4 m-1 cursor-pointer flex rounded-xl bg-neutral-700 border border-neutral-600">
            +
            <Hotkey is="Enter" />
          </button>
      </div>
    )
}