import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HiCursorClick } from "react-icons/hi";
import { Link } from "react-router";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="max-w-7xl mt-40 mb-20 mx-auto">
      <div className="flex flex-col tems-center g:flex-row gap-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col items-start"
        >
          {/* <motion.div
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
          </motion.div> */}

          <p className="max-w-4xl relative font-extrabold tracking-tight text-5xl md:text-6xl">
            <span className="drop-shadow-xl drop-shadow-white/20">
              No chaos in the
              <motion.span className="text-cyan-600 dark:text-cyan-300 drop-shadow-xl dark:drop-shadow-cyan-500/50">
                {" "}
                head!
              </motion.span>
            </span>
          </p>

          <p className="text-md md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl my-5">
            Minimalistic tool for storing text information with easy orientation
            regardless of scale
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
            <Button onClick={onGetStarted} size="lg" variant="colorfull">
              Get Started
              <HiCursorClick className="w-5 h-5" />
            </Button>
            <Link to={"/about"}>
              <Button onClick={onGetStarted} size="lg">
                Docs
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* WORKSPACE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 w-full flex items-center justify-center "
        >
          {/* <div className="w-full hover:scale-103 hover:shadow-blue-400/10 shadow-2xl duration-200 h-[480px] rounded-2xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm text-neutral-400"> */}
          {/* <NotesStructurePreview /> */}
          <video
            src="/plan.mp4"
            controls
            className="h-full rounded-xl object-cover border-neutral-800 border"
          />
          {/* </div> */}
        </motion.div>
      </div>
    </div>
  );
};
