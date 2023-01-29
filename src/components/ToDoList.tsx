import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  // 그냥 쓰면 toDoState의 default가 type이 정의가 안되어서 never type이기 때문에 type을 정해주기 위해 사용
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  /**
   *
   * const value = useRecoilValue(toDoState); // atom으로부터 state를 가져옴
     const modFn = useSetRecoilState(toDoState); // atom으로부터 state를 수정함
    밑의 함수와 동일 함
   */
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setToDos((oldToDos) => [
      { text: data.toDo, id: Date.now(), category: "TODO" },
      ...oldToDos,
    ]); // 원래 있던 배열을 mutate 하는게 아닌 새로운 array를 반환 하기 위해 {}<IToDo>로 갖춰진 값을 반환
    setValue("toDo", ""); // register에 등록된 toDo input 을 비어있는 "" 로 set
  };
  console.log(toDos);

  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "Please write a ToDo",
          })}
          placeholder="Write ToDo"
        />
        <button>Write</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
