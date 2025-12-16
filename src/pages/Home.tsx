import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { GiProgression, GiStarsStack } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import {
  TbArrowRight,
  TbDeviceMobile,
  TbKeyboard,
  TbRocket,
  TbSparkles,
} from "react-icons/tb";
import { motion, useMotionValue } from "framer-motion";

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const springConfig = { damping: 25, stiffness: 700 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // const mouseXSpring = useSpring(mouseX, springConfig);
  // const mouseYSpring = useSpring(mouseY, springConfig);
  // const rotateX = useTransform(mouseYSpring, [0, 1], ["15deg", "-15deg"]);
  // const rotateY = useTransform(mouseXSpring, [0, 1], ["-15deg", "15deg"]);
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

  // const DimensionPortal = () => {
  //   return (
  //     <motion.div
  //       className="relative w-full h-[400px] rounded-3xl overflow-hidden my-12"
  //       style={{ rotateX, rotateY }}
  //       ref={containerRef}
  //     >
  //       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent" />
  //       <img className="w-full object-cover opacity-90" src="https://img.freepik.com/premium-photo/modern-futuristic-neon-light-background_33739-414.jpg" alt="" />
  //     </motion.div>
  //   );
  // };
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

  // const diffTable = [
  //   ["Критерій", "Notebook", "Notes", "Notion", "Strukt"],
  //   ["Організація", "Yes", "No", "Yes", "Yes"],
  //   ["Масштабованість", "None", "None", "Partial", "Yes"],
  //   ["Зручність використання", "Partial", "Yes", "No", "Yes"],
  //   ["Швидкість роботи", "None", "Yes", "No", "Yes"],
  //   ["Мобільна адаптивність", "N/A", "Yes", "Partial", "Yes"],
  //   ["Клавіатурні скорочення", "N/A", "None", "Partial", "Yes"],
  // ];
  const diffTable = [
    [
      "Критерій",
      "Нотарій",
      "Записник",
      "Буття",
      "Мислення",
      "Візія",
      "Еволюція",
    ],
    ["Організація", "Ручна", "Немає", "✓", "✓✓", "✓✓✓", "∞"],
    ["Масштабованість", "10%", "1%", "40%", "70%", "90%", "∞"],
    ["Зручність", "🟡", "🟢", "🟢", "🟢🟢", "🟢🟢🟢", "✨"],
    ["Швидкість", "1x", "2x", "3x", "5x", "10x", "∞"],
    ["Адаптивність", "🟡", "🟢", "🟢", "🟢🟢", "🟢🟢🟢", "✨"],
    ["Розширення", "🟡", "🔴", "🟢", "🟢🟢", "🟢🟢🟢", "✨"],
  ];

  const features = [
    {
      icon: <TbKeyboard className="w-6 h-6" />,
      title: "Keyboard First",
      description: "Full keyboard navigation with intuitive shortcuts",
    },
    {
      icon: <GiStarsStack className="w-6 h-6" />,
      title: "AI Powered",
      description: "Smart organization and search capabilities",
    },
    {
      icon: <TbDeviceMobile className="w-6 h-6" />,
      title: "Mobile Ready",
      description: "Seamless experience across all devices",
    },
    {
      icon: <TbSparkles className="w-6 h-6" />,
      title: "Zero Lag",
      description: "Instant response with any amount of notes",
    },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Product Manager",
      text: "Strukt revolutionized how I organize my meeting notes and product specs.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      name: "Maria Rodriguez",
      role: "Researcher",
      text: "Finally a tool that scales with my research without becoming messy.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
      name: "David Kim",
      role: "Developer",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <ParticleBackground />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
      </div>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative p-4 md:p-6 max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex fixed w-full z-10 items-center justify-between mb-12 left-0 top-0 bg-neutral-900/10 p-4 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TbRocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-300">Strukt</span>
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={() => navigate("login")}>
                  Sign In
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("workspace")} className="gap-2">
                Go to Workspace <TbArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

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
              <div className="inline-flex -rotate-3 items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-12">
                <span className="text-sm font-medium text-cyan-300">
                  ⚡ Version 1.0 Now Live
                </span>
              </div>

              <p className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6">
                <span>1000 notes</span>
                <br />
                <span className="text-neutral-800 dark:text-neutral-200">
                  Feel like{" "}
                  <motion.span
                    animate={{ textShadow: ["0 0 10px #00ffff"] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="text-cyan-300"
                  >
                    10
                  </motion.span>
                </span>
              </p>

              <p className="text-md md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mb-10">
                Organize ideas, plans, and goals with AI-powered structure that
                grows with you.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <Button
                  size="lg"
                  onClick={() => navigate("workspace")}
                  className="text-lg border-none px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <GiProgression className="w-6 h-6 mr-2" />
                  Start with 5 steps
                </Button>

                <p className="text-xs text-neutral-400 hidden sm:block">
                  Press <b>W</b> · Workspace
                  <br />
                  Press <b>L</b> · Login
                </p>
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
              <div className="w-full max-w-xl h-[480px] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-md shadow-xl flex items-center justify-center text-neutral-400">
                Workspace preview
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
          <Stat value="100%" label="Uptime" color="text-purple-600" />
          <Stat value="10+" label="Shortcuts" color="text-pink-600" />
          <Stat value="0ms" label="Typing Lag" color="text-green-600" />
        </motion.div>

        {/* <DimensionPortal /> */}

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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4">
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
          <h2 className="text-3xl font-bold text-center mb-10">
            Еволюція нотаток через виміри
          </h2>

          <div className="bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-6 border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {diffTable[0].map((header, idx) => (
                      <th
                        key={idx}
                        className="text-left py-4 px-4 text-gray-300 font-semibold"
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
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="py-4 px-4">
                          {cellIdx === 0 ? (
                            <span className="text-gray-300">{cell}</span>
                          ) : (
                            <motion.div
                              className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${
                                cell === "∞" || cell === "✨"
                                  ? "gradient-bg"
                                  : cell.includes("✓") || cell.includes("🟢")
                                  ? "bg-green-500/10 text-green-300"
                                  : cell.includes("🟡")
                                  ? "bg-yellow-500/10 text-yellow-300"
                                  : "bg-red-500/10 text-red-300"
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
          <h2 className="text-3xl font-bold text-center mb-10">
            Loved by Thousands
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
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20" />
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
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"
            />
          </div>

          <div className="relative p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готові до <span className="text-sky-300">квантового</span>{" "}
              <span className="text-pink-300">стрибка?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Приєднуйтесь до тих, хто вже подорожує вимірами власного мислення
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("workspace")}
                className="text-lg border-none px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <GiProgression className="w-6 h-6 mr-2" />
                Start with 5 steps
              </Button>
            </div>

            <p className="text-sm text-cyan-300/70 mt-6">
              ⚡ Нульовий поріг входу
            </p>
          </div>
        </motion.div>
        <p className="text-center text-neutral-500 p-4">
          2025, Made in Ukraine by Vlad
        </p>
      </div>
    </div>
  );
};
