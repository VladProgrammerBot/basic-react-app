import { motion } from "framer-motion";
import { TbChevronDown } from "react-icons/tb";

export const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 rounded-full bg-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex items-center justify-center cursor-pointer"
        onClick={handleScrollToTop}
      >
        <TbChevronDown className="w-6 h-6 text-white rotate-180" />
      </motion.div>
    </div>
  );
};