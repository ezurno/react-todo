import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
    Done1: [],
    Done2: [],
    Done3: [],
  },
});

export const popUpState = atom({
  key: "popUp",
  default: false,
});
