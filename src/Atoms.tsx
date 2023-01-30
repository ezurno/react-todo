import { atom, selector } from "recoil";

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

/**
 * selector로 toDoState를 가져와 새 배열을 만들지만 수정은 하지 않는 의존적이지만 동적인 함수
 */
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // get은 object의 .get 함수
    const toDos = get(toDoState);
    const category = get(categoryState);

    // if (category === "TODO")
    //   return toDos.filter((toDo) => toDo.category === "TODO");
    // if (category === "DOING")
    //   return toDos.filter((toDo) => toDo.category === "DOING");
    // if (category === "DONE")
    //   return toDos.filter((toDo) => toDo.category === "DONE");
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categoryState = atom({
  key: "category",
  default: "TODO",
});
