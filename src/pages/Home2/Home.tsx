import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { GiProgression, GiStarsStack } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { TbChevronDown, TbKeyboard, TbRocket } from "react-icons/tb";
import { motion, useMotionValue } from "framer-motion";
import { BsCheck, BsMarkdown } from "react-icons/bs";
import { HiCursorClick } from "react-icons/hi";
import NotesStructurePreview from "../Home/Preview";

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const x = (e.clientX - rect.left) / width;
      const y = (e.clientY - rect.top) / height;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const ParticleBackground = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    );
  };

  const diffTable = [
    ["Критерій", "Notebook", "Word", "Notes", "Notion", "Strukt"],
    ["Організація", "✓", "✓✓", "✓", "✓✓", "✓✓✓"],
    ["Масштабованість", "✗", "✗", "✗", "✓", "∞"],
    ["Зручність використання", "✓", "✗", "✓✓", "✓", "✓✓✓"],
    ["Швидкість роботи", "✗", "✗", "✓", "✓", "✓✓✓"],
    ["Мобільна адаптивність", "✗", "✗", "✓✓", "✓", "✓✓✓"],
    ["Клавіатурні скорочення", "✗", "✓", "✗", "✓", "✓✓✓"],
  ];

  const features = [
    {
      icon: <TbKeyboard className="w-6 h-6" />,
      title: "Full Keyboard",
      description: "Comfurtable vim-like shortcuts for light speed",
    },
    {
      icon: <GiStarsStack className="w-6 h-6" />,
      title: "AI Powered",
      description: "Smart structuring that adapts to your needs",
    },
    {
      icon: <BsCheck className="w-6 h-6" />,
      title: "Simple interface",
      description: "All attention on the content",
    },
    {
      icon: <BsMarkdown className="w-6 h-6" />,
      title: "Markdown export",
      description: "Use information outside",
    },
  ];

  const testimonials = [
    {
      name: "ChatGPT",
      role: "Top 1 LLM",
      text: "Strukt revolutionized how I organize my meeting notes and product specs.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      name: "Gemini",
      role: "LLM",
      text: "Finally a tool that scales with my research without becoming messy.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
      name: "Claude",
      role: "LLM",
      text: "The keyboard shortcuts save me hours every week. Pure productivity.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ];

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "l") {
      navigate("login");
    }
    if (e.key === "w") {
      navigate("workspace");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const Stat = ({
    value,
    label,
    color,
  }: {
    value: string;
    label: string;
    color: string;
  }) => (
    <div className="flex flex-col items-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-neutral-500">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <ParticleBackground />
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full bg-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex items-center justify-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <TbChevronDown className="w-6 h-6 text-white rotate-180" />
        </motion.div>
      </div>
      <div className="fixed inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
      </div>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute -top-40 -right-40 w-120 h-120 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-120 h-120 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative p-4 pb-0 md:pb-0 md:p-6 max-w-7xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            damping: 15,
            stiffness: 100,
          }}
          className="flex fixed w-full z-10 items-center justify-between mb-12 left-0 top-0 bg-white/70 dark:bg-neutral-900/10 p-4 backdrop-blur-lg border-b border-neutral-200/50 dark:border-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TbRocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              Strukt
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isLoggedIn && (
              <>
                <Button
                  variant="ghost"
                  size={"icon"}
                  onClick={() => navigate("login")}
                >
                  Sign In
                </Button>
                <p className="text-xs bg-neutral-500/10 rounded-md px-2 py-1 border-1 border-neutral-500/30 text-black/50 dark:text-white/50">
                  Press <b>L</b>
                </p>
              </>
            )}
          </div>
        </motion.div>

        <div className="max-w-7xl mt-20 mb-20 mx-auto">
          <div className="flex flex-col items-center lg:flex-row gap-16 w-full">
            {/* LEFT — HERO CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="
        flex-1
        flex flex-col
        items-center text-center
        lg:items-start lg:text-left
      "
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex -rotate-3 items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  AI Powered
                </span>
              </motion.div>
              <p className="max-w-4xl relative text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="drop-shadow-xl drop-shadow-white/20">
                  Stop keeping <br /> everything in{" "}
                </span>
                <br />
                <motion.span className="text-cyan-600 dark:text-cyan-300 drop-shadow-xl dark:drop-shadow-cyan-500/50">
                  your head!
                </motion.span>
              </p>

              <p className="text-md md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl my-5">
                Organize your ideas, goals, and knowledge as easily as in{" "}
                <b>File Explorer</b>, without chaos like in notes.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-4">
                <Button
                  onClick={() => navigate("workspace")}
                  size={"lg"}
                  variant={"colorfull"}
                >
                  Get Started
                  <HiCursorClick className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Stats */}
            </motion.div>

            {/* RIGHT — WORKSPACE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 w-full flex items-center justify-center"
            >
              {/* Workspace preview */}
              <div className="w-full dark:shadow-2xl shadow-xl dark:shadow-blue-500/20 shadow-neutral-300 max-w-xl h-[480px] rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/20 backdrop-blur-sm text-neutral-400">
                <NotesStructurePreview />
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-10 my-12"
        >
          <Stat value="∞" label="Scalability" color="text-blue-600" />
          <Stat value="100%" label="Own rules" color="text-purple-600" />
          <Stat value="10+" label="Shortcuts" color="text-pink-600" />
          <Stat value="0ms" label="Typing Lag" color="text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white shadow-2xl shadow-blue-500/10 dark:bg-neutral-800/20 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800 dark:text-neutral-100">
            Why Strukt?
          </h2>

          <div className="bg-whit dark:bg-gradient-to-b dark:from-black/5 dark:to-transparent rounded-3xl p-6 border border-neutral-200 dark:border-white/10 shadow-">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    {diffTable[0].map((header, idx) => (
                      <th
                        key={idx}
                        className="text-left py-4 px-4 text-neutral-600 dark:text-gray-300 font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {diffTable.slice(1).map((row, rowIdx) => (
                    <motion.tr
                      key={rowIdx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: rowIdx * 0.1 }}
                      className="border-b border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`py-4 px-4 ${
                            cellIdx === diffTable[0].length - 1
                              ? "bg-sky-300/5 dark:bg-sky-700/5"
                              : ""
                          }`}
                        >
                          {cellIdx === 0 ? (
                            <span className="text-neutral-700 dark:text-gray-300 font-medium">
                              {cell}
                            </span>
                          ) : (
                            <motion.div
                              className={`text-nowrap w-fit items-center justify-center px-3 py-1 rounded-full font-medium ${
                                cell === "∞" ||
                                cell === "✨" ||
                                // ? "gradient-bg"
                                cell.includes("✓") ||
                                cell.includes("🟢")
                                  ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                                  : cell.includes("🟡")
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {cell}
                            </motion.div>
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800 dark:text-neutral-100">
            Loved by LLMs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white shadow-2xl shadow-blue-500/10 dark:bg-neutral-800/20 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-neutral-100"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl mb-20 dark:shadow-2xl shadow-blue-300/10 shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-pink-600/10 dark:from-cyan-600/20 dark:via-purple-600/20 dark:to-pink-600/20" />
          <div className="absolute inset-0">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity },
              }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 dark:from-cyan-500/10 dark:to-purple-500/10"
            />
          </div>

          <div className="relative p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              Ready to{" "}
              <span className="text-sky-500 dark:text-sky-300">free up</span>
              {" your "}
              <span className="text-pink-500 dark:text-pink-300">memory?</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Start using Strukt as your reliable memory
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="colorfull" onClick={() => navigate("workspace")}>
                <GiProgression className="w-6 h-6 mr-2" />
                Get Started for FREE
              </Button>
            </div>

            <p className="text-sm text-cyan-600 dark:text-cyan-300/70 mt-6">
              ⚡ Zero entry threshold
            </p>
          </div>
        </motion.div>
        <div className="floater mb-24 mx-auto w-fit">
          <div className="spinner p-4">
            <span className="text-content ml-2">It's FREE!</span>
          </div>
        </div>
        <div className="relative">
            <p className="text-center text-neutral-500 p-18 border-t-1 border-neutral-300 dark:border-neutral-700">
              © 2025, Made in Ukraine by Vlad 🇺🇦
            </p>
        </div>
      </div>
    </div>
  );
};
