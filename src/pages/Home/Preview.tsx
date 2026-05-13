import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbChevronRight } from "react-icons/tb";

interface Note {
  id: number;
  level: number;
  text: string;
  icon: string | React.ReactNode;
  color: string;
}

const NotesStructurePreview: React.FC = () => {
  const [visibleNotes, setVisibleNotes] = useState<Note[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const notes: Note[] = [
    {
      id: 1,
      level: 0,
      text: "Ідеї для проекту",
      icon: "💡",
      color: "bg-yellow-500",
    },

    {
      id: 2,
      level: 1,
      text: "Нова функція автозбереження",
      icon: "✨",
      color: "bg-purple-500",
    },

    {
      id: 3,
      level: 0,
      text: "Рецепти",
      icon: "📚",
      color: "bg-blue-500",
    },

    {
      id: 4,
      level: 1,
      text: "Омлет",
      icon: "🍳",
      color: "bg-green-500",
    },

    {
      id: 5,
      level: 2,
      text: "Збити 2 яйця з молоком",
      icon: "1️⃣",
      color: "bg-cyan-500",
    },

    {
      id: 6,
      level: 2,
      text: "Смажити 3 хв на середньому вогні",
      icon: "2️⃣",
      color: "bg-cyan-500",
    },

    {
      id: 8,
      level: 0,
      text: "Плани на тиждень",
      icon: "📋",
      color: "bg-orange-500",
    },

    {
      id: 9,
      level: 1,
      text: "Понеділок",
      icon: "📅",
      color: "bg-pink-500",
    },

    {
      id: 10,
      level: 2,
      text: "Дедлайн звіту",
      icon: "📝",
      color: "bg-gray-500",
    },

    {
      id: 11,
      level: 1,
      text: "Вівторок",
      icon: "📅",
      color: "bg-pink-500",
    },

    {
      id: 12,
      level: 2,
      text: "...",
      icon: "",
      color: "bg-gray-500",
    },
  ];

  useEffect(() => {
    if (currentIndex >= notes.length) {
      const timeout = setTimeout(() => {
        setVisibleNotes([]);
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setVisibleNotes((prev) => [...prev, notes[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timeout);
  }, [currentIndex, notes]);

  return (
    <div className="w-full h-full p-6 font-sans">
      {/* "Header" імітація вікна */}
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
        </div>
        <div className="text-center absolute left-1/2 -translate-x-1/2 text-xs font-medium text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
          Workspace
        </div>
      </div>

      <div className="overflow-y-hidden">
        <AnimatePresence mode="popLayout">
          {visibleNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative flex items-center"
              style={{ marginLeft: `${note.level * 24}px` }}
            >
              {/* Лінії ієрархії */}
              {note.level > 0 && (
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
              )}

              <div className="flex items-center gap-3 w-full py-1 px-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-default">
                <span className="flex-shrink-0 text-lg group-hover:scale-120 transition-transform duration-300">
                  {note.icon}
                </span>

                <span className="text-sm md:text-base font-medium text-neutral-700 dark:text-neutral-200 truncate">
                  {note.text}
                </span>

                {note.level === 0 && (
                  <TbChevronRight className="ml-auto w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Курсор, що блимає */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-5 bg-blue-500 rounded-sm ml-[24px]"
          style={{
            display: currentIndex < notes.length ? "block" : "none",
            marginLeft:
              visibleNotes.length > 0
                ? `${visibleNotes[visibleNotes.length - 1].level * 24 + 36}px`
                : "12px",
          }}
        />
      </div>
    </div>
  );
};

export default NotesStructurePreview;
