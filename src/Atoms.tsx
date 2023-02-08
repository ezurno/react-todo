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
    "하는 중": [],

    "해야 할 일": [
      { id: 0, text: "공부 하기" },
      { id: 1, text: "점심 먹기" },
      { id: 2, text: "운동" },
      { id: 4, text: "심부름 하기" },
    ],
    "완 료": [{ id: 3, text: "서점 다녀오기" }],
  },
});

export const popUpState = atom({
  key: "popUp",
  default: false,
});

export const boardState = atom<string[]>({
  key: "boards",
  default: ["하는 중", "해야 할 일", "완 료"],
});

export const cardChanger = atom({
  key: "changer",
  default: {
    boardId: "",
    index: 0,
  },
});
