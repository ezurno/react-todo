import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    toDo: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
