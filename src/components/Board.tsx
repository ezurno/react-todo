import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  font-size: 12px;
  font-weight: bold;
`;

const Area = styled.div<IAreaProps>`
  padding: 5px;
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromthis ? "red" : "blue"};
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
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(
          magic,
          snapshot // snapshot args는 드래그가 됐는지 boolean type으로 값을 받음 (우클릭 후 형식 정의)
        ) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromthis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
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
