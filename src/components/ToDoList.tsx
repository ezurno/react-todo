import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../Atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const [toDos, Doing, Done] = useRecoilValue(toDoSelector); // Selector가 [{}, {}, {}]형태

  console.log(toDos);

  return (
    <div>
      <h1>To Do List</h1>
      <CreateToDo />

      <h2>toDos</h2>
      <hr />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <h2>Doing</h2>
      <hr />
      <ul>
        {Doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <h2>Done</h2>
      <hr />
      <ul>
        {Done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
