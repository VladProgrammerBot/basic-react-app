import { motion } from "framer-motion";
import { MdFilterCenterFocus } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiGraphLight } from "react-icons/pi";
import { FaGlobeAmericas } from "react-icons/fa";

const features = [
  {
    icon: <FaGlobeAmericas className="w-6 h-6" />,
    title: "Universal Workspace",
    description: "Knowledge, ideas, plans, instructions, and calendars — all your crucial information structured in one single place.",
  },
  {
    icon: <IoSpeedometerOutline className="w-6 h-6" />,
    title: "Fast to Use",
    description: "Full keyboard and hotkey support eliminates interface clutter. No nested menus or useless buttons — just pure speed.",
  },
  {
    icon: <MdFilterCenterFocus className="w-6 h-6" />,
    title: "Easy to Use",
    description: "A content-oriented interface that feels immediately familiar. Minimalist and clean, just like your favorite file explorer.",
  },
  {
    icon: <PiGraphLight className="w-6 h-6" />,
    title: "Perfect Understanding",
    description: "Effortlessly manage information on a large scale. A flexible, network-like structure that is incredibly easy to edit and navigate.",
  },
];

export const FeaturesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h2 className="font-bold text-center mb-8">Features</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            // whileHover={{ y: -5 }}
            className="hover:scale-105 hover:shadow-blue-400/10 shadow-2xl duration-200 bg-white dark:bg-neutral-800/10 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
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
  );
};
