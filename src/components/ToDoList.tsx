import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { toDoState } from "../Atoms";
import CreateToDo from "./CreateToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  console.log(toDos);

  return (
    <div>
      <h1>To Do List</h1>
      <CreateToDo />
    </div>
  );
}

export default ToDoList;
