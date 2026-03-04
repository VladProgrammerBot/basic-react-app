import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";
import { Input } from "./Input";
import { ItemTitle } from "./ItemTitle";

export const ItemContent = () => {
  const isMinimalist = false;
  const containterStyles = !isMinimalist
    ? "rounded-xl p-2 border border-neutral-700 bg-neutral-800"
    : "";

  const data = [
    "Kanban",
    "Ideas",
    "Запамятай: жодних машин!!!",
    "Спробувати зробити лідирующі інструменти (у кожен момент) чіткішими та прагнути максимуму гучності у важливих частинах як у анімалс, там де баси високі ліди мають бути гучними",
  ];

  return (
    <div className={containterStyles}>
      <ItemTitle />
      <TipForRelated />
      <ul className="space-y-1 mt-1">
        {data.map((title, index) => (
          <ConnectedItem key={index} title={title} />
        ))}
      </ul>
      {!isMinimalist && <Input />}
    </div>
  );
};
