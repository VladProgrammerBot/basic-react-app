import { motion } from "framer-motion";
import { TbKeyboard } from "react-icons/tb";
import { GiStarsStack } from "react-icons/gi";
import { BsCheck, BsMarkdown } from "react-icons/bs";

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

export const FeaturesSection = () => {
  return (
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
  );
};