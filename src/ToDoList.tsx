import React, { useState } from "react";

function ToDoList() {
  const [toDo, setToDo] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} placeholder="Write to do list here." />
      <button>submit</button>
    </form>
  );
}

export default ToDoList;
