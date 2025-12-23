export const guideSteps = [
    {
      id: 1,
      title: "Навігація всередину",
      emoji: "🔍",
      problem: {
        emoji: "🔴",
        text: "Ідеї, лайвхаки, плани губляться серед тисячі нотаток",
      },
      solution: {
        emoji: "💡",
        text: "strukt дозволяє швидко знаходити необхідну інформацію",
      },
      note: {
        emoji: "📌",
        text: "Інтерфейс як у провіднику файлів",
      },
      action: {
        emoji: "🎯",
        steps: ['Нажміть на папку "Plans for tomorrow"'],
        result: "За один клік отримано всі плани на завтра",
      },
      result: {
        emoji: "✅",
        text: "Швидше отримуєте необхідну та пов'язану інформацію",
      },
      tryYourself: {
        emoji: "🚀",
        steps: ["Знайдіть серед цілей заповнену папку та перегляньте її"],
      },
    },
    {
      id: 2,
      title: "Контекст",
      emoji: "🧭",
      problem: {
        emoji: "🔴",
        text: "Важко орієнтуватися у великій кількості інформації",
      },
      solution: {
        emoji: "💡",
        text: "Шлях вгорі показує контекст інформації, яку переглянуто. Можна перейти на рівень вище",
      },
      action: {
        emoji: "🎯",
        steps: [
          'Перейшовши у "plans for today" отримано шлях Root/plans for today (контекст)',
          'Нажміть на "Root" щоб перейти на вищий контекст',
        ],
        result: null,
      },
      result: {
        emoji: "✅",
        text: "Чудова орієнтація у інформації незалежно від обсягу",
      },
      tryYourself: {
        emoji: "🚀",
        steps: [
          "Перейдіть за ланцюжком: Root / Development / school / Math",
          'Проаналізуйте "path". Про що ця папка?',
        ],
      },
    },
    {
      id: 3,
      title: "Масштабування",
      emoji: "📈",
      problem: {
        emoji: "🔴",
        text: "Notion надто складний для швидкого зберігання, а у нотатках безлад",
      },
      solution: {
        emoji: "💡",
        text: "Strukt дозволяє зберегти інформацію, щоб її було легко знайти",
      },
      action: {
        emoji: "🎯",
        steps: [
          'Перейдіть у папку за шляхом "Root/Health/cooking"',
          'Додайте рядом із Pizza новий рецепт: нажміть на + та напишіть "Pancakes"',
          "Натисніть Enter",
        ],
        result: null,
      },
      result: {
        emoji: "✅",
        text: "Рецепт знаходиться там, де ви точно знаєте",
      },
      tryYourself: {
        emoji: "🚀",
        steps: [
          'Перейдіть у "Pancakes"',
          "Додайте необхідні папки для опису рецепту",
          "Перейдіть у Root та спробуйте найти створений рецепт",
        ],
      },
    },
    {
      id: 4,
      title: "Редагування",
      emoji: "✏️",
      problem: {
        emoji: "🔴",
        text: "Переробляючи план, кожна зміна - новий листок",
      },
      solution: {
        emoji: "💡",
        text: "Видаляй, перейменовуй, переміщай - легко",
      },
      action: {
        emoji: "🎯",
        steps: [
          'Перейдіть по ланцюжку "Root/Development/Foreign languages"',
          'У меню папки виберіть "Cut (move)"',
          'Перейдіть у "school" та нажміть "Paste"',
        ],
        result: "Було переміщено папку English у контекст шкільних предметів",
      },
      result: {
        emoji: "✅",
        text: "Непередбачуване майбутнє - не проблема",
      },
      tryYourself: {
        emoji: "🚀",
        steps: [
          'Перейменуйте папку "plans for tomorrow" на "plans for today" (відкладати на потім - погана практика)',
          "Самі вирішіть яку ціль вилучити у Root / Pet_project / goals",
          'Відсортуйте кроки у рецепті піци функціями "move up", "move down"',
        ],
      },
    },
    {
      id: 5,
      title: "Кінець",
      emoji: "🎉",
      congratulations: {
        emoji: "🎉",
        text: "Вітаємо! Ваша інформація легко зберігається та шукається",
      },
      message: {
        emoji: "📚",
        text: "Цей посібник - вершина айсберга прихованих суперможливостей strukt, для подальшого вивчення рекомендується Root / Docs",
      },
      spoiler: {
        emoji: "💡",
        text: "Інформація про Hero Headline там теж є",
      },
      tip: {
        emoji: "⚡",
        text: "Use j, k, l keys to navigate faster",
      },
    },
  ];