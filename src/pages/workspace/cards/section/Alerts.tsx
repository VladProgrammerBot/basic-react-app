import { IoMdAlert, IoMdClose } from "react-icons/io"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

export const Alerts = () => {
  const [alerts, setAlerts] = useState([{ id: 12, color: "red", text: "Folder Added success, now you can move inside it" }])

  return (
    <div className="p-4 flex flex-col gap-2 items-end fixed dark:text-white bottom-0 z-20 right-0">
      <AnimatePresence initial={false}>
        {alerts.map((elem) => {
          return (
            <motion.div
              key={elem.id}
              // 3. layout: ЦЕЙ ПРОП ВКЛЮЧАЄ АНІМАЦІЮ РУХУ (FLIP)!
              // Коли позиція елемента змінюється, Framer Motion плавно його пересуває.
              layout
              // Анімація ВХОДУ
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              // Анімація ВИХОДУ
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            >
              <div className={`flex p-4 items-center animate-fade-in gap-2 border-1 bg-${elem.color}-200 shadow-md shadow-neutral-300 dark:shadow-neutral-950 rounded-md border-${elem.color}-500 dark:bg-${elem.color}-800/90`}>
                <IoMdAlert className="text-xl" />
                <p onClick={() => {
                  console.log(Math.floor(Math.random() * 10));
                  setAlerts([...alerts, { id: Math.random(), color: "green", text: "new Alert" }])
                }} className="text-sm flex-1 mr-4 sm:mr-8">{elem.text}</p>
                <button onClick={() => {

                  setAlerts(
                    alerts.filter((alert) => elem.id !== alert.id)
                  )
                }} className="cursor-pointer">
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