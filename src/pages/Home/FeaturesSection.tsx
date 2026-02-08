import { motion } from "framer-motion";
import { IoSearchSharp } from "react-icons/io5";
import { MdFilterCenterFocus } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

const features = [
  {
    icon: <FaLink className="w-6 h-6" />,
    title: "Holistic approach",
    description: "Information is stored in small, logically linked elements.",
  },
  {
    icon: <IoSearchSharp className="w-6 h-6" />,
    title: "Quick search",
    description: "Navigating from the abstract to the concrete",
  },
  {
    icon: <MdFilterCenterFocus className="w-6 h-6" />,
    title: "Content-oriented interface",
    description: "The interface is minimalist and simple, like a file explorer",
  },
  {
    icon: <IoSpeedometerOutline className="w-6 h-6" />,
    title: "Work at high speed",
    description: "Full keyboard support",
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
