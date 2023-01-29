import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../Atoms";

function ToDo({ id, category, text }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = { text, id, category: name as IToDo["category"] };
      // 새롭게 type을 지정해주어야 함 안그러면 oldToDos에서 받는 type이 달라서 error
      console.log(targetIndex);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ]; // 값을 slice로 잘라서 새로 만들어 반환
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TODO" && (
        <button name="TODO" onClick={onClick}>
          TODO
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          DONE
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          DOING
        </button>
      )}
    </li>
  );
}

export default ToDo;
