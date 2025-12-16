import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router";
import { Footer } from "./workspace/cards/footer";
import { Brain, CheckCircle2, HeartHandshake } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GiProgression, GiStarsStack } from "react-icons/gi";
import { useEffect, useState } from "react";
import { TbArrowRight, TbDeviceMobile, TbKeyboard, TbRocket, TbSparkles } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

export const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const ParticleBackground = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
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
              repeatType: "reverse"
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
    ["Критерій", "Нотарій", "Записник", "Буття", "Мислення", "Візія", "Еволюція"],
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
      description: "Full keyboard navigation with intuitive shortcuts"
    },
    {
      icon: <GiStarsStack className="w-6 h-6" />,
      title: "AI Powered",
      description: "Smart organization and search capabilities"
    },
    {
      icon: <TbDeviceMobile className="w-6 h-6" />,
      title: "Mobile Ready",
      description: "Seamless experience across all devices"
    },
    {
      icon: <TbSparkles className="w-6 h-6" />,
      title: "Zero Lag",
      description: "Instant response with any amount of notes"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Product Manager",
      text: "Strukt revolutionized how I organize my meeting notes and product specs.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      name: "Maria Rodriguez",
      role: "Researcher",
      text: "Finally a tool that scales with my research without becoming messy.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    {
      name: "David Kim",
      role: "Developer",
      text: "The keyboard shortcuts save me hours every week. Pure productivity.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    }
  ];

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      navigate("login");
    }
    if (e.key === "w" && (e.ctrlKey || e.metaKey)) {
      navigate("workspace");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const getStatus = (value: string): TableIconProps['status'] => {
    if (value === "🟢 Yes") return "Yes"; // Збережено для сумісності, якщо ви десь ще використовуєте старі дані
    if (value === "🔴 No" || value === "🔴 None" || value === "🔴 Very slow" || value === "🔴 Hard" || value === "🔴 Slow") return "No";
    if (value === "🟡 Partial" || value === "🟡 Medium") return "Partial";
    if (value === "⚪ N/A") return "N/A";
    return value as TableIconProps['status']; // Припускаємо, що це вже один із чистих статусів
  }

  interface TableIconProps {
    status: "Yes" | "No" | "Partial" | "N/A" | "None";
  }

  const TableIcon: React.FC<TableIconProps> = ({ status }) => {
    const iconClass = "mx-auto w-5 h-5";

    switch (status) {
      case "Yes":
        return <CheckCircle2 className={`${iconClass} text-emerald-500`} />;
      case "Partial":
        return <svg className={`${iconClass} text-yellow-500`} fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>;
      case "No":
      case "None":
        return <IoCloseCircleOutline className={`${iconClass} text-rose-500`} />;
      case "N/A":
      default:
        return <span className="text-neutral-400 text-sm">N/A</span>;
    }
  };

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
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Strukt
            </span>
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-20 mb-20 md:mb-32"
        >
          <div
            className="inline-flex -rotate-3 items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-12"
          >
            <span className="text-sm font-medium text-cyan-300">
              ⚡ Version 1.0 Now Live
            </span>
          </div>
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-8">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              🚀 Version 1.0 Now Live
            </span>
          </div> */}

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              1000 notes
            </span>
            <br />
            <span className="text-neutral-800 dark:text-neutral-200">
              feel like{" "}
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 10px #00ffff",
                    "0 0 20px #ff00ff",
                    "0 0 10px #00ffff"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-cyan-300"
              >
                10
              </motion.span>
              {/* <span className="relative text-shadow-[0 0 10px #00ffff]">
                10
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -right-8 top-0 text-4xl"
                >
                  ✨
                </motion.span>
              </span> */}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-10">
            Organize ideas, plans, and goals with AI-powered structure that grows with you.
          </p>

          <Button
            size="lg"
            onClick={() => navigate("workspace")}
            className="text-lg border-none px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <GiProgression className="w-6 h-6 mr-2" />
            Start with 5 steps
          </Button>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">∞</div>
              <div className="text-neutral-500">Scalability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-neutral-500">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">10+</div>
              <div className="text-neutral-500">Shortcuts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0ms</div>
              <div className="text-neutral-500">Typing Lag</div>
            </div>
          </div>
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
                className="bg-white dark:bg-neutral-800/20 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* </AnimatePresence> */}

        {/* Comparison Table */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: .3 } }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Strukt?</h2>
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-sm sm:text-lg mx-auto border-separate border-spacing-0 rounded-xl overflow-hidden shadow-lg dark:shadow-neutral-900">
              <thead className="bg-blue-600 dark:bg-blue-800">
                <tr className="text-white">
                  {diffTable[0].map((item, index) => {
                    return <th key={index} className={`py-3 sm:p-4 text-start ${index === 0 ? "pl-4 rounded-tl-xl" : ""} ${index === diffTable[0].length - 1 ? "rounded-tr-xl" : ""} font-semibold`}>{item}</th>
                  })}
                </tr>
              </thead>

              <tbody>
                {diffTable.map((row, rowIndex) => {
                  if (rowIndex === 0) return null
                  return (
                    <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"} border-b dark:border-neutral-700 last:border-b-0`}>
                      {row.map((item, itemIndex) => (
                        <td key={itemIndex} className={`py-3 sm:p-4 ${itemIndex === 0 ? "pl-4 font-medium" : "text-center"}`}>
                          {itemIndex === 0 ? item : <TableIcon status={getStatus(item)} />}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div> */}
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
                      <th key={idx} className="text-left py-4 px-4 text-gray-300 font-semibold">
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
                              className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${cell === '∞' || cell === '✨'
                                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300'
                                  : cell.includes('✓') || cell.includes('🟢')
                                    ? 'bg-green-500/10 text-green-300'
                                    : cell.includes('🟡')
                                      ? 'bg-yellow-500/10 text-yellow-300'
                                      : 'bg-red-500/10 text-red-300'
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
          <h2 className="text-3xl font-bold text-center mb-10">Loved by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800/20 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 italic">"{testimonial.text}"</p>
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
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"
            />
          </div>

          <div className="relative p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готові до{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                квантового стрибка
              </span>
              ?
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

          <p className="text-xl text-center text-neutral-500 dark:text-neutral-400">
            Made with love and with your productivity in mind.
          </p>

        <Footer />
      </div>
    </div>
  );
};