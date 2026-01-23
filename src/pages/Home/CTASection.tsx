import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GiProgression } from "react-icons/gi";

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
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
          <Button variant="colorfull" onClick={onGetStarted}>
            <GiProgression className="w-6 h-6 mr-2" />
            Get Started for FREE
          </Button>
        </div>

        <p className="text-sm text-cyan-600 dark:text-cyan-300/70 mt-6">
          ⚡ Zero entry threshold
        </p>
      </div>
    </motion.div>
  );
};