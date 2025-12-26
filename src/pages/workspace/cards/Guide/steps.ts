export const guideSteps = [
    {
      id: 1,
      title: "Search information",
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
      },
      result: {
        emoji: "✅",
        text: "За один клік отримано всі плани на завтра",
      },
      tryYourself: {
        emoji: "🚀",
        steps: ["Знайдіть серед цілей заповнену папку. Що там?"],
      },
    },
    {
      id: 2,
      title: "Context",
      emoji: "🧭",
      problem: {
        emoji: "🔴",
        text: "Плани, гайди, ідеї - все змішано і незрозуміло звідки що взялося",
      },
      solution: {
        emoji: "💡",
        text: "Strukt дозволяє швидко розуміти контекст любої інформації",
        // text: "Шлях вгорі показує контекст інформації, яку переглянуто. Можна перейти на рівень вище",
      },
      action: {
        emoji: "🎯",
        steps: [
          'Перегляньте шлях з верху, його приблизний вигляд: "Root / plans for tomorrow"',
          'Нажміть на "Root" щоб перейти на вищий контекст',
        ],
        result: null,
      },
      result: {
        emoji: "✅",
        text: "Переглядаючи плани ви можете швидко зрозуміти їх контекст",
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
      title: "Scalebility",
      emoji: "📈",
      problem: {
        emoji: "🔴",
        text: "Зявилася нова ідея чи лайвхак. Куди це покласти, щоб можна було пізніше знайти?",
      },
      solution: {
        emoji: "💡",
        text: "Strukt дозволяє зберегти інформацію, щоб було легко знайти пізніше",
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
        text: "Ви зберегли новий рецепт там, де він має бути",
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
      title: "Editing",
      emoji: "✏️",
      problem: {
        emoji: "🔴",
        text: "Переробляючи план чи гайд, кожна зміна - новий листок",
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
        text: "Ви легко перемістили папку з англійською у контекст навчання без клопотів",
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
      emoji: "🎉",
      congratulations: {
        emoji: "🎉",
        text: "Вітаємо! Ваша інформація легко зберігається та шукається",
      },
      message: {
        emoji: "📚",
        text: "Цей посібник - вершина айсберга прихованих суперможливостей strukt, для подальшого вивчення рекомендується \"Root / Docs\"",
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