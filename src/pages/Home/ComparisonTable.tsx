import { motion } from "framer-motion";

const diffTable = [
  ["Критерій", "Notebook", "Word", "Notes", "Notion", "Strukt"],
  ["Організація", "✓", "✓✓", "✓", "✓✓", "✓✓✓"],
  ["Масштабованість", "✗", "✗", "✗", "✓", "∞"],
  ["Зручність використання", "✓", "✗", "✓✓", "✓", "✓✓✓"],
  ["Швидкість роботи", "✗", "✗", "✓", "✓", "✓✓✓"],
  ["Мобільна адаптивність", "✗", "✗", "✓✓", "✓", "✓✓✓"],
  ["Клавіатурні скорочення", "✗", "✓", "✗", "✓", "✓✓✓"],
];

export const ComparisonTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800 dark:text-neutral-100">
        Why Strukt?
      </h2>

      <div className="hover:scale-103 hover:shadow-blue-400/10 shadow-2xl duration-200 dark:bg-gradient-to-b dark:from-black/5 dark:to-transparent rounded-3xl p-6 border border-neutral-200 dark:border-white/10 shadow-">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-white/10">
                {diffTable[0].map((header, idx) => (
                  <th
                    key={idx}
                    className="text-left py-4 px-4 text-neutral-600 dark:text-gray-300 font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diffTable.slice(1).map((row, rowIdx) => (
                <motion.tr
                  key={rowIdx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: rowIdx * 0.1 }}
                  className="border-b border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`py-4 px-4 ${
                        cellIdx === diffTable[0].length - 1
                          ? "bg-sky-300/5 dark:bg-sky-700/5"
                          : ""
                      }`}
                    >
                      {cellIdx === 0 ? (
                        <span className="text-neutral-700 dark:text-gray-300 font-medium">
                          {cell}
                        </span>
                      ) : (
                        <motion.div
                          className={`text-nowrap w-fit items-center justify-center px-3 py-1 rounded-full font-medium ${
                            cell === "∞" ||
                            cell === "✨" ||
                            cell.includes("✓") ||
                            cell.includes("🟢")
                              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                              : cell.includes("🟡")
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300"
                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {cell}
                        </motion.div>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
