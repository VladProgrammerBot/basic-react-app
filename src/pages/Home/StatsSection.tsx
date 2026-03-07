import { motion } from "framer-motion";

interface StatProps {
  value: string;
  label: string;
  color: string;
}

const Stat = ({ value, label, color }: StatProps) => (
  <div className="flex flex-col items-center">
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className="text-neutral-500">{label}</div>
  </div>
);

export const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap justify-center gap-10 my-12"
    >
      <Stat value="∞" label="Scalability" color="text-blue-600" />
      <Stat value="100%" label="Own rules" color="text-purple-600" />
      <Stat value="10+" label="Shortcuts" color="text-pink-600" />
      <Stat value="0" label="Learning" color="text-green-600" />
    </motion.div>
  );
};
