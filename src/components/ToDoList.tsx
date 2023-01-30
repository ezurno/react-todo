import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../Atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector); // Selector가 [{}, {}, {}]형태
  const [category, setCategory] = useRecoilState(categoryState); // category 값을 저장하기 위한 useRecoilState
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  console.log(category);

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TODO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      ;
    </div>
  );
}

export default ToDoList;
