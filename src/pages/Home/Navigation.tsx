import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TbRocket } from "react-icons/tb";

interface NavigationProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
}

export const Navigation = ({ isLoggedIn, onSignIn }: NavigationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        type: "spring",
        damping: 15,
        stiffness: 100,
      }}
      className="flex fixed w-full z-10 items-center justify-between mb-12 left-0 top-0 bg-white/70 dark:bg-neutral-900/10 p-4 backdrop-blur-lg border-b border-neutral-200/50 dark:border-transparent"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <TbRocket className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
          Strukt
        </span>
      </div>

      <div className="flex items-center gap-2">
        {!isLoggedIn && (
          <>
            <Button variant="ghost" size="icon" onClick={onSignIn}>
              Sign In
            </Button>
            <p className="text-xs bg-neutral-500/10 rounded-md px-2 py-1 border-1 border-neutral-500/30 text-black/50 dark:text-white/50">
              Press <b>L</b>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};