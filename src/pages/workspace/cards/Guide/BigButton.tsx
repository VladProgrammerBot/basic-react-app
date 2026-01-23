export const BigButton: React.FC<{Func: () => void, text: string, tooltip: string}> = ({Func, text, tooltip}) => {
    return <div
          onClick={Func}
          className="fixed bottom-4 right-4 z-100 group cursor-pointer"
        >
          {/* Анімовані кільця навколо кнопки */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 group-hover:opacity-100 animate-pulse blur-md transition-all duration-300" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 animate-ping" />

          {/* Основна кнопка */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
            {/* Внутрішнє світіння */}
            <div className="absolute inset-0.5 rounded-full bg-white/10 backdrop-blur-sm" />

            {/* Знак питання */}
            <span className="relative text-3xl font-bold text-white drop-shadow-lg">
              {text}
            </span>

            {/* Блиск при наведенні */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
              {tooltip}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>;
}