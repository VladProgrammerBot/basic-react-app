import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HiCursorClick } from "react-icons/hi";

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="hover:scale-103 hover:shadow-blue-400/10 shadow-2xl duration-200 relative overflow-hidden rounded-3xl mb-20"
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
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
        />
      </div>

      <div className="relative p-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Ready to <span className="text-sky-300">think</span>
          {" more "}
          <span className="text-pink-300">effectively?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          It's a simple and powerful tool for building your external memory.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onGetStarted} size="lg" variant="colorfull">
            Get Started
            <HiCursorClick className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-cyan-300/70 mt-6">
          ⚡ Zero entry threshold
        </p>
      </div>
    </motion.div>
  );
};