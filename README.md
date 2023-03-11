# ✨ React-Todo 프로젝트 ✨

하루 일정을 작성하는 todo-list를 react를 사용하여 만듦

<br/>

## 사용한 기술 🛠️

- styled-component
- Recoil
- react-beautiful-dnd
- Aseprite tool
- react-icons

<br/>
<hr/>

> ## 메인 화면

<br/>
<img src ="md_resources\resource_1.png" width="400"/>
<br/>
<br/>

- 가운데에는 react-beautiful-dnd 를 활용해 리스트를 나열

<br/>
<hr/>

> ## 보드의 리스트순서 변경 가능

<br/>
<img src ="md_resources\resource_2.png" width="400"/>
<br/>
<br/>

- draggable 과 droppable 을 가운데 부분과 리스트 부분에 사용하여 리스트 순서를 바꿀 수도 있음
- board의 상태를 recoil로 관리
- drag & drop 시 beautiful-dnd 가 위치를 감지해 boardState의 배열 값을 재할당해 위치를 변경 함

````ts
 export const boardState = atom<string[]>({
   key: "boards",
   default: ["하는 중", "해야 할 일", "완 료"],
 });```
````

<br/>
<img src ="md_resources\resource_3.png" width="400"/>
<br/>
<br/>

- 다른 리스트끼리도 할 일 목록을 변경 할 수 있음
- beautiful-dnd 가 drop 시 위치를 확인하며 할일 리스트를 다시 재할당함
- 할 일이 dragging 중 인지의 여부를 확인해 색상을 바꿔줌

```ts
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
```

<br/>
<hr/>

> ## 새로운 할 일 추가

<br/>
<img src ="md_resources\resource_4.png" height="400"/>
<img src ="md_resources\resource_5.png" height="400"/>
<br/>
<br/>

- form 값으로 toDo를 받아 새로운 newToDo로 만들고 입력값을 추가한 새 배열을 만듦 (mutate X)

```ts
const onValid = ({ toDo }: IForm) => {
  const newToDo = {
    id: Date.now(),
    text: toDo,
  };

  setToDos((allBoards) => {
    return {
      ...allBoards,
      [boardId]: [...allBoards[boardId], newToDo],
    };
  });
  setValue("toDo", "");
};
```

<br/>
<hr/>

> ## 할 일 수정 및 삭제

<br/>
<img src ="md_resources\resource_6.png" width="400"/>
<br/>
<br/>

- 수정 아이콘을 누르면 modal 창이 열림
- todo 의 id 를 이용해 recoil에 저장 된 값을 새로 만들어 줌 (mutate X)

<br/>
<hr/>

> ## 그 외

<br/>
<img src ="md_resources\resource_7.png" height="150"/>
<img src ="md_resources\resource_8.png" height="150"/>
<br/>
<br/>

- 메인 로고 이미지는 Aseprite tool로 직접 만듦
- Github 아이콘은 react-icons 라이브러리를 이용했으며 누르면 Github 으로 이동 함
