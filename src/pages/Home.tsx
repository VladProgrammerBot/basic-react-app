import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router";
import { Footer } from "./workspace/cards/footer";
import { CheckCircle2, HeartHandshake } from "lucide-react";
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

  // const diffTable = [
  //   ["Criterion", "Notebook", "Notes", "Notion", "Strukt"],
  //   ["Organization", "🟢 Yes", "🔴 No", "🟢 Yes", "🟢 Yes"],
  //   ["Scalability", "🔴 None", "🔴 None", "🟡 Partial", "🟢 Infinite"],
  //   ["Ease of use", "🟡 Medium", "🟢 Very easy", "🔴 Hard", "🟢 Easy"],
  //   ["Speed of use", "🔴 Very slow", "🟢 Fast", "🔴 Slow", "🟢 Fast"],
  //   ["Mobile adaptive", "⚪ N/A", "🟢 Full", "🟡 Partial", "🟢 Full"],
  //   ["Keyboard shortcuts", "⚪ N/A", "🔴 None", "🟡 Partial", "🟢 Full"],
  // ];

  const CallToActionSection = () => {
  return (
    <div className="mt-20 py-16 bg-neutral-100 dark:bg-neutral-900 rounded-2xl text-center shadow-inner">
      <h2 className="text-3xl font-bold mb-4">Готові до структури?</h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">Почніть організовувати свої думки сьогодні. Це швидко і просто.</p>
      <NavLink to="workspace">
        <Button className="px-8 py-3 text-lg border-none dark:shadow-2xl shadow-blue-600 hover:shadow-blue-500 duration-150 text-white gradient-bg animate-pulse-once">
          <HeartHandshake className="mr-2 h-5 w-5" />Спробувати Strukt безкоштовно
        </Button>
      </NavLink>
    </div>
  )
}

  const diffTable = [
    ["Критерій", "Notebook", "Notes", "Notion", "Strukt"],
    ["Організація", "Yes", "No", "Yes", "Yes"],
    ["Масштабованість", "None", "None", "Partial", "Yes"],
    ["Зручність використання", "Partial", "Yes", "No", "Yes"],
    ["Швидкість роботи", "None", "Yes", "No", "Yes"],
    ["Мобільна адаптивність", "N/A", "Yes", "Partial", "Yes"],
    ["Клавіатурні скорочення", "N/A", "None", "Partial", "Yes"],
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
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative p-4 md:p-6 max-w-7xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-12"
        >
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
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-8">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              🚀 Version 1.0 Now Live
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              1000 notes
            </span>
            <br />
            <span className="text-neutral-800 dark:text-neutral-200">
              feel like{" "}
              <span className="relative">
                10
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -right-8 top-0 text-4xl"
                >
                  ✨
                </motion.span>
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-10">
            Organize ideas, plans, and goals with AI-powered structure that grows with you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("workspace")}
              className="text-lg border-none px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <GiProgression className="w-6 h-6 mr-2" />
              Start with 5 steps
            </Button>
          </div>

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

        {/* Features Grid */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-20"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
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
        </AnimatePresence>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
                className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Notes?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who switched to Strukt and never looked back.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-xl"
            onClick={() => navigate(isLoggedIn ? "workspace" : "login")}
          >
            {isLoggedIn ? "Open Workspace" : "Start Free Trial"}
            <TbArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-blue-200 mt-4">
            No credit card required • 14-day free trial
          </p>
        </motion.div>
        <CallToActionSection />

        <div className="w-full max-w-4xl mt-20">
          <p className="text-xl text-center text-neutral-500 dark:text-neutral-400">
            Зроблено з любов'ю та думкою про вашу продуктивність.
          </p>
        </div>

        {/* Footer */}
        <Footer />

        {/* Keyboard Shortcut Hint */}
        <div className="fixed bottom-4 right-4 bg-white dark:bg-neutral-800 rounded-lg p-3 shadow-lg border border-neutral-200 dark:border-neutral-700 text-sm">
          <div className="flex items-center gap-2">
            <TbKeyboard className="w-4 h-4" />
            <span>Press</span>
            <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs">Ctrl/Cmd + W</kbd>
            <span>for Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};