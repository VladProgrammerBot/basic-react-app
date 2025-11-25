import { IoMdAlert, IoMdClose } from "react-icons/io"
import { motion, AnimatePresence } from 'framer-motion';
import store from "@/state/store";

export const Messages = () => {
  const alerts = store.use.alerts()
  const deleteAlert = store.use.deleteAlert()

  const colorMap = {
    red: {
      bg: 'bg-red-200 dark:bg-red-800/90',
      border: 'border-red-500',
    },
    blue: {
      bg: 'bg-blue-200 dark:bg-blue-800/90',
      border: 'border-blue-500',
    },
    green: {
      bg: 'bg-green-200 dark:bg-green-800/90',
      border: 'border-green-500',
    },
  };

  return (
    <div className="p-4 flex flex-col gap-2 items-end fixed dark:text-white bottom-0 z-20 right-0">
      <AnimatePresence initial={false}>

        {alerts.map((elem) => {
          const styles = colorMap[elem.color];

          return (
            <motion.div
              key={elem.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            >
              <div className={`flex p-4 items-center animate-fade-in gap-2 border-1 shadow-md shadow-neutral-300 dark:shadow-neutral-950 rounded-md ${styles.bg} ${styles.border}`}>
                <IoMdAlert className="text-xl" />
                <p className="text-sm flex-1 mr-4 sm:mr-8">{elem.text}</p>
                <button onClick={() => deleteAlert(elem.id)} className="cursor-pointer">
                  <IoMdClose />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}