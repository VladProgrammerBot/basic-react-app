import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router";
import { Footer } from "./workspace/cards/footer";
import { CheckCircle2 } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate()
  const diffTable = [
    ["Criterion", "Notebook", "Notes", "Notion", "Strukt"],
    ["Organization", "🟢 Yes", "🔴 No", "🟢 Yes", "🟢 Yes"],
    ["Scalability", "🔴 None", "🔴 None", "🟡 Partial", "🟢 Infinite"],
    ["Ease of use", "🟡 Medium", "🟢 Very easy", "🔴 Hard", "🟢 Easy"],
    ["Speed of use", "🔴 Very slow", "🟢 Fast", "🔴 Slow", "🟢 Fast"],
    ["Mobile adaptive", "⚪ N/A", "🟢 Full", "🟡 Partial", "🟢 Full"],
    ["Keyboard shortcuts", "⚪ N/A", "🔴 None", "🟡 Partial", "🟢 full"],
  ];

  const mouseDownEvent = (e: KeyboardEvent) => {
    if (e.key === "l") {
      navigate("login")
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", mouseDownEvent)
    return () => {
      document.removeEventListener("keydown", mouseDownEvent)
    }
  }, [])

  return (
    <div className="p-4" onKeyUp={(e) => console.log(e, 1)}>
      <div className="flex w-full justify-between">
        <div className="text-2xl font-bold">
          Strukt
        </div>
        {!localStorage.getItem("token") && <Link to={"/login"}>
          <Button variant={"outline"}>
            Log in
          </Button>
        </Link>}
      </div>
      <div className="max-w-4xl mx-auto">
        <img
          className="w-45 aspect-square mx-auto mb-2 mt-8 drop-shadow-lg drop-shadow-white dark:drop-shadow-neutral-950"
          src="https://cdn-icons-png.freepik.com/512/8298/8298289.png" alt="" />
        <div className="flex flex-col items-center pb-75 space-y-6">
          <div className="text-4xl space-x-4 justify-center flex flex-wrap sm:text-5xl font-bold w-fit text-shadow-neutral-500 text-center drop-shadow-lg dark:drop-shadow-neutral-600">
            <p>
              1000 notes
            </p>
            <p>
              feel like 10
            </p>
          </div>
          <p className="text-md sm:text-xl text-neutral-500 text-center">
            Quickly organize and store text information such as ideas, goals, plans, and more.
          </p>
          <NavLink to="workspace">
            <Button className="border-none dark:shadow-2xl shadow-blue-600 hover:shadow-blue-500 duration-150 text-white gradient-bg">
              <GiProgression />Start with 5 steps
            </Button>
          </NavLink>
        </div>
        <table className="w-full text-xs sm:text-lg mx-auto">
          <thead className="gradient-bg">
            <tr className="text-white">
              {diffTable[0].map((item, index) => {
                return <th key={index} className={`py-2 sm:p-4 text-start ${index === 0 && "text-start pl-2"} font-normal`}>{item}</th>
              })}
            </tr>
          </thead>

          <tbody>
            {diffTable.map((row, rowIndex) => {
              if (rowIndex === 0) return
              return <tr key={rowIndex} className={`${rowIndex % 2 === 0 && "bg-neutral-200 dark:bg-neutral-800"}`}>
                {row.map((item, itemIndex) => {
                  return <td key={itemIndex} className={`max-sm:leading-5 ${itemIndex !== 0 ? "text-cente" : "pl-2"} max-sm:px-1 py-2 sm:p-4`}>{typeof item === "string" ? item : item ? <CheckCircle2 className="text-green-500 mx-auto" /> : <IoCloseCircleOutline fontSize={27} className="text-red-500 mx-auto" />}</td>
                })}
              </tr>
            })}
          </tbody>
        </table>
        <div className="w-full max-w-4xl mt-80">
          Yes!
        </div>
        <Footer />
      </div>
    </div>
  );
};