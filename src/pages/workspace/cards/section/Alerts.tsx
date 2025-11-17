import { IoMdAlert, IoMdClose } from "react-icons/io"

export const Alerts = () => {
    return (
        <div className="p-2 fixed bottom-0 z-20 right-0">
        <div className="flex p-4 items-center animate-fade-in gap-2 border-1  rounded-md border-green-500 bg-green-800/90">
          <IoMdAlert className="text-xl" />
          <p className="text-sm flex-1 mr-4 sm:mr-8">Folder Added success, now you can move inside it</p>
          <button className="cursor-pointer">
            <IoMdClose />
          </button>
        </div>
      </div>
    )
}