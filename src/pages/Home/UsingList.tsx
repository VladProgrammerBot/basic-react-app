import { FaCheck } from "react-icons/fa6";

export const UsingList = () => {
  const usingExamples = [
    "Creating detailed plans and strategies",
    "Thinking without the risk of forgetting",
    "Building a Zettelkasten knowledge system",
    "Organizing goals and achievements in easy-to-create manual calendars",
    "Storing instructions and ideas",
    "Prototype documentation",
  ];

  return (
    <div>
      <h2 className="font-bold mb-8 text-center">What can you do</h2>
      <div className="w-full text-lg border-white/20 hover:scale-103 hover:shadow-blue-500/10 shadow-2xl duration-200 border rounded-xl p-6 mb-20 bg-neutral-800/10">
        <div className="flex flex-wrap space-y-2">
          {usingExamples.map((example, index) => (
            <div
              className="flex md:w-1/2 gap-2 backdrop-blur-sm hover:z-10 duration-200 p-2 rounded-xl shadow-black/50"
              key={index}
            >
              <span className="text-green-500 h-fit p-2 rounded-full bg-green-500/10">
                <FaCheck />
              </span>
              <p className="drop-shadow-lg drop-shadow-white/30">{example}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
