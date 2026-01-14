export const Experements = () => {
  const benefits = ["Найти роботу", "Бути корисним"]; // Множинні батьки
  const currentGoal = "Закінчити проєкт Strukt";
  const actions = ["Змінити середовище", "Вивчати психологію", "Більше спати"];

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 font-sans border border-gray-800 rounded-xl bg-black text-gray-200">
      
      {/* СЕКЦІЯ: НАВІЩО? (БАТЬКИ) */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Навіщо? (Контекст)</span>
        <div className="flex flex-wrap gap-2">
          {benefits.map((item, index) => (
            <div
              className="px-3 py-1 bg-orange-900/30 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 cursor-pointer duration-200 text-sm rounded-full"
              key={index}
            >
              ↑ {item}
            </div>
          ))}
        </div>
      </div>

      {/* СЕКЦІЯ: ЦЕНТРАЛЬНИЙ ВУЗОЛ */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
        <div className="relative py-3 px-4 bg-gray-900 border border-green-500/50 text-green-400 font-bold text-lg rounded-lg shadow-xl">
          {currentGoal}
        </div>
      </div>

      {/* СЕКЦІЯ: ЯК? (ДІТИ) */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Як? (Дії / Кроки)</span>
        <div className="flex flex-col gap-2">
          {actions.map((item, index) => (
            <div
              className="group flex justify-between items-center bg-blue-900/20 border border-blue-500/20 hover:border-blue-500/50 px-3 py-2 cursor-pointer duration-150 rounded-lg text-blue-300 text-sm"
              key={index}
            >
              <span>{item}</span>
              <span className="text-blue-500/50 group-hover:text-blue-400">↓</span>
            </div>
          ))}
          
          <button className="w-full py-2 border border-dashed border-gray-700 text-gray-600 hover:text-gray-400 hover:border-gray-500 duration-150 rounded-lg text-sm italic">
            + Додати крок або підціль
          </button>
        </div>
      </div>

    </div>
  );
};