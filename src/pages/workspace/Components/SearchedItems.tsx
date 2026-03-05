import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";

export const SearchedItems = () => {
  return (
    <ul className="space-y-1">
      <TipForRelated />
      {[
        "Kanban",
        "Ideas",
        "Запамятай: жодних машин!!!",
        "Спробувати зробити лідирующі інструменти (у кожен момент) чіткішими та прагнути максимуму гучності у важливих частинах як у анімалс, там де баси високі ліди мають бути гучними",
      ].map((title) => {
        return (
          <div>
            <ConnectedItem title={title} />
          </div>
        );
      })}
    </ul>
  );
};
