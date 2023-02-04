import React, { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`;

const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromthis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromthis: boolean;
}

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null); //useRef 지정 시 type을 알려줘야 함
  const onClick = () => {
    inputRef.current?.focus(); // ref 지정 된 것을 focus() 해줌
    setTimeout(() => {
      inputRef.current?.blur(); // blur 로 5초후에 focus() 꺼짐
    }, 5000);
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>click me</button>
      <Droppable droppableId={boardId}>
        {(
          magic,
          snapshot // snapshot args는 드래그가 됐는지 boolean type으로 값을 받음 (우클릭 후 형식 정의)
        ) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromthis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef} // ref는 react 코드를 이용해 html 요소를 지정하고 가져올 수 있음 (주소지정)
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard toDo={toDo} index={index} key={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Board);
