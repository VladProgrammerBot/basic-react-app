import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HiCursorClick } from "react-icons/hi";
import NotesStructurePreview from "./Preview";
import { Link } from "react-router";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="max-w-7xl mt-20 mb-20 mx-auto">
      <div className="flex flex-col items-center g:flex-row gap-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col items-center text-center g:items-start g:text-left"
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
              Stop
              <motion.span className="text-cyan-600 dark:text-cyan-300 drop-shadow-xl dark:drop-shadow-cyan-500/50">
                {" "}
                losing <br />
              </motion.span>
            </span>
            your
            <motion.span className="text-cyan-600 dark:text-cyan-300 drop-shadow-xl dark:drop-shadow-cyan-500/50">
              {" "}
              ideas{" "}
            </motion.span>
            in notes!
          </p>

          <p className="text-md md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl my-5">
            {/* Organize your ideas, goals, and knowledge as easily as in{" "}
            <b>File Explorer</b>, without chaos like in notes. */}
            {/* In strukt, your ideas, goals, and knowledge will be quickly found at
            the right moment, just like files on a computer. */}
            {/* In Strukt, information is organized like files on your computer, with related information in a shared folder. */}
            Strukt is a place where your text information can be found quickly,
            organized as easily as files on a computer.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
            <Button onClick={onGetStarted} size="lg" variant="colorfull">
              Get Started
              <HiCursorClick className="w-5 h-5" />
            </Button>
            <Link to={"about"}>
              <Button size="lg" variant="outline">
                About
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* WORKSPACE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 w-full flex items-center justify-center"
        >
          <div className="w-full dark:shadow-2xl shadow-xl dark:shadow-blue-500/20 shadow-neutral-300 max-w-xl h-[480px] rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/20 backdrop-blur-sm text-neutral-400">
            <NotesStructurePreview />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
