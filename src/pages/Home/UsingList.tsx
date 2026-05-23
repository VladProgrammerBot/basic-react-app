import { FaCheck } from "react-icons/fa6";

export const UsingList = () => {
  const usingExamples = [
    "Developing detailed strategic plans",
    "Storing reusable code templates",
    "Building a Zettelkasten knowledge management system",
    "Tracking goals and achievements via structured calendars",
    "Centralizing documentation, guides, and ideas",
    "Managing prototype and project documentation",
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
        What can you do
      </h2>
      
      <div className="w-full border border-neutral-800 bg-neutral-900/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/5">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usingExamples.map((example, index) => (
            <li
              className="flex items-start gap-4 p-3 rounded-xl transition-colors duration-200 hover:bg-neutral-800/30"
              key={index}
            >
              <span className="flex-shrink-0 text-green-400 p-2 rounded-lg bg-green-500/10 border border-green-500/10">
                <FaCheck className="w-4 h-4" />
              </span>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed pt-0.5">
                {example}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};