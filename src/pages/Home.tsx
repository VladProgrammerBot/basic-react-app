import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { TbClick } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { LuAtom } from "react-icons/lu";
import { Footer } from "./workspace/cards/footer";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export const Home = () => {
  return (
    <div className="p-4">
      <div className="flex w-full justify-between">
        <div className="text-2xl font-bold">
          Strukt
        </div>
        <Button>
          Log in
        </Button>
      </div>
      <div className="max-w-5xl mx-auto">
        {/* <div className="fixed left-0 top-0 -z-10 w-screen h-screen bg-neutral-900">
          <div className="bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px] h-full p-8 flex items-center justify-center ">
            <div className="w-130 bg-neutral-900 aspect-square flex items-center justify-center shadow-2xl shadow-blue-500 rounded-full"></div>
          </div>
        </div> */}
        {/* <img className="mx-auto rounded-md mb-4 w-1/3" src="https://ec.europa.eu/regional_policy/assets/images/menu-icons/information-sources/publications-icon.png" alt="" /> */}
        {/* <img className="mx-auto rounded-md mb-4" src="https://cdn-icons-png.freepik.com/256/6033/6033290.png?semt=ais_white_label" alt="" /> */}
        <img className="w-50 mx-auto my-8" src="https://clipart-library.com/2023/brain-clipart-xl.png" alt="" />
        <div className="flex flex-col items-center pb-75 space-y-6">
          <p className="text-5xl font-bold w-fit text-shadow-neutral-500 text-center">Remember everything you need</p>
          <p className="text-md sm:text-xl text-neutral-500 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="flex text-lg items-center gap-6">
            <NavLink to="workspace">
              <Button className="shadow-2xl hover:shadow-blue-500 shadow-blue-600"><TbClick />Start with AI</Button>
            </NavLink>
            <p className="text-xl font-bold flex items-center gap-1 gradient-text text-blue-600">AI Integration</p>
          </div>
        </div>
        <div className="flex mb-75 rounded-md shadow-2xl bg-neutral-800 shadow-blue-500 overflow-hidden">
          <div className="flex-1 relative">
            <p className="text-2xl py-2 rounded-md text-center absolute bottom-2 bg-red-500 right-1/2 translate-x-1/2 flex gap-2 items-center px-4"><IoMdClose />Before</p>
            <img className="w-full aspect-square object-cover" src="https://media.istockphoto.com/id/900454212/vector/vector-seamless-pattern-with-real-hand-written-latin-text-in-color-on-white-paper-lectures.jpg?s=612x612&w=0&k=20&c=oGELKjixV-yD13vFtoeJjjsY4klJ_q4nv6owXEQsnsA=" alt="" />
          </div>
          <div className="flex-1 relative">
            <p className="text-2xl py-2 rounded-md text-center absolute bottom-2 bg-green-500 right-1/2 translate-x-1/2 flex gap-2 items-center px-4"><FaCheck />After</p>
            <img src="/after.png" className="aspect-square w-full object-cover" alt="" />
          </div>
        </div>
        <div className="flex max-sm:flex-col items-center gap-8  mb-75">
          <img className="rounded-md w-full aspect-video sm:max-w-1/2 shadow-2xl shadow-blue-500" src="https://img.freepik.com/premium-photo/bridging-knowledge-gap-illuminating-business-education-bright-light-bulb-iconic-bo_1000124-230190.jpg" alt="" />
          <p className="text-4xl sm:text-5xl max-sm:text-center font-bold text-shadow-neutral-500 pb-2">Keep your knowledge</p>
        </div>
        <div className="flex max-sm:flex-col sm:flex-row-reverse items-center gap-8  mb-75">
          <img className="rounded-md w-full aspect-video sm:max-w-1/2 shadow-2xl shadow-blue-500" src="https://t4.ftcdn.net/jpg/09/26/93/69/360_F_926936965_2VuurfE4CFrEwTbnJaMtUmS58FVuGEYK.jpg" alt="" />
          <p className="text-4xl sm:text-5xl max-sm:text-center font-bold text-shadow-neutral-500 pb-2">Manage Your Thoughts</p>
        </div>
        <div className="flex max-sm:flex-col items-center gap-8 mb-75">
          <img className="rounded-md w-full sm:max-w-1/2 aspect-video object-cover shadow-2xl shadow-blue-500" src="https://img.freepik.com/premium-photo/strategic-planning-hand-touching-chess-king-global-business-connection-digital-age-teamwork-concept_1066250-2871.jpg" alt="" />
          <p className="text-4xl sm:text-5xl max-sm:text-center font-bold text-shadow-neutral-500 pb-2">Plan your life</p>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};
