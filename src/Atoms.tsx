import { atom } from "recoil";

export interface IToDo {
  // 그냥 쓰면 toDoState의 default가 type이 정의가 안되어서 never type이기 때문에 type을 정해주기 위해 사용
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

export interface IForm {
  toDo: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
