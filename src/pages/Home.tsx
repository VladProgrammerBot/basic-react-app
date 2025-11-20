import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const markdown = `* own prompt 2
  * prompt
    * правила виводу
      * можна використовувати лише відступи, символ зірочки та переноси для відображення структури
      * заборонено писати коментарі та що небуть, що не є частиною структури
      * ось приклад структури
        * * folder 1 
        * folder 1.1
        * folder 1.2
        * folder 1.3
          * folder 1.3.1
          * folder 1.3.2
        * folder 1.4
           * folder 1.4.1
             * folder 1.4.2
      * вивід має бути у тому ж форматі що і цей промпт
    * промпт* prompt
  * хто ти:
    * ти - спеціаліст по створенню та організації інформації у структурованому вигляді, ти маєш здатність шукати любу інформацію та логічно їх організовувати, виконуєш вказівки та можеш виконувати алгоритми дій для автоматизації у організації
  * твоя роль
    * твоя роль - на основі промпту користувача ти маєш рішити яку інформацію використати (найдену чи надану користувачем) та як її організувати у структурі (самому вирішити або використати вказівки користувача), щоб вирішити проблему користувача
  * правила
    * формат відповіді
      * вихідні данні мають бути строго у форматі описаному нижче
      * правила
        * структура у виході має мати лише один самий кореневий елемент, наприклад у списку фруктів це буде fruits
      * що можна використовувати
        * переноси на новий рядок
        * відступи (абзаци), щоб відобразити структуру
        * зірочку після відступів та перед самим текстом
      * що використовувати КАТЕГОРИЧНО ЗАБОРОНЕНО
        * категорично заборонено використовувати любі інші функції markdown як от ">>", "##", "**" і тд.
        * категорично заборонено писати коментарі та опис, у вивід повинно виводитися лише структурований текст
      * порушення правил формату виводу може викликати помилки у коді
      * приклад вихідниї данних
        * формат виводу такий самий як і у цьому промпті
  * приклади промптів та результат генерації ші
    * 1
      * prompt:
        * згенеруй список папок, що містять дати починаючи із сьогоднішньої до цієї неділі, ось формат "xx.xx.xxxx"
      * output:
        * calendar
          * 20.10.2025
          * 21.10.2025
          * 22.10.2025
          * 23.10.2025
    * 2
      * prompt:
        * на основі наданої інформації про рецепту цукерки згенеруй структуру, також поправ помилки у тексті та зроби його більш зрозумілим, ось рецепт "дві ложки цукру на одну ложку води, змішати у посудині та додати пару крапель лимона, помішувати та дочекатися поки почне коричнивіти, дальше переливаємо на змажену олією фольгу і можна або в морозілку або холодною водою полити і все"
      * output:
        * інградієнти
          * цукор / вода = 2 / 1
          * пару крапель лимону (необовязково)
        * процес приготування
          * 1. змішати всі інгредієнти
          * 2. поставити на вогонь
            * весь час помішувати
            * якщо колір коричневий - виключити вогонь та перейти до наступного кроку
          * 3. охолодити
            * використовуючи холодильник або холодну воду
    * 3
      * prompt:
        * згенеруй конспект по роках від 1992 по 2000 з історії україни
      * output:
        * 1992 - нові державні символи
          * Опис...
        * 1993 - ...
        * ...
  * промпт користувача`

export const Home = () => {
  const markdownToJson = (markdown: string) => {
    const array1 = markdown.split("\n");
    const newArray = new Map()
    const parentsMatrix = [] as number[]

    array1.forEach((elem) => {
      const matchResult = elem.match(/^ */) ?? ''
      const parents = matchResult[0].length / 2;
      const generatedId = Math.floor(Math.random() * 2000000000)
      const parentId = parentsMatrix[parents - 1]
      const text = elem.substring(parents * 2 + 2)

      newArray.set(generatedId, {
        title: text,
        parent: parentId,
        childrens: []
      })

      if (parentId) {
        const parentData = newArray.get(parentId)

        newArray.set(parentId, {
          ...parentData,
          childrens: [...parentData.childrens, generatedId]
        })
      }

      parentsMatrix[parents] = generatedId
    });

    const result = Array.from(newArray, ([key, value]) => ({ id: key, ...value }))

    return result
  }

  console.log(markdownToJson(markdown));

  return (
    <div>
      <div className="p-4 mx-auto max-w-4xl text-center w-full flex flex-col items-center gap-4 fixed translate-1/2 bottom-1/2 right-1/2">
        <p className="text-8xl">Strukt</p>
        <p className="text-2xl font-thin">
          Organize information easily and without limits.
        </p>
        <div className="flex gap-2 text-lg">
          <NavLink to="workspace">
            <Button variant={"outline"}>Get started</Button>
          </NavLink>
          <NavLink to="about">
            <Button>Manual</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
