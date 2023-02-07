import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../Atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const Buttons = styled.div`
  display: flex;
  span {
    :hover {
      cursor: pointer;
    }
  }
`;

function DraggableCard({
  toDoText,
  toDoId,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onDelCard = () => {
    console.log("DEL: ", boardId, index);
    setToDos((allBoards) => {
      const newBoard = [
        ...allBoards[boardId].slice(0, index),
        ...allBoards[boardId].slice(index + 1),
      ];
      return {
        ...allBoards,
        [boardId]: newBoard,
      };
    });
  };

  return (
    <Draggable key={toDoId} draggableId={toDoId.toString()} index={index}>
      {(
        magic,
        snapshot // 두번째 args를 부여 후 형식 정의를 찾아봄
      ) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <Buttons>
            <span className="material-symbols-outlined">update</span>
            <span className="material-symbols-outlined" onClick={onDelCard}>
              delete
            </span>
          </Buttons>
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
