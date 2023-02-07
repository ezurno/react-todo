import React, { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../Atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div<{ isDragging: boolean }>`
  border: 5px solid black;

  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 480px;
  min-width: 200px;
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
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    border: none;
    background-color: black;
    height: 36px;
    text-align: center;
    transition: background-color 0.3s ease-in-out;
    :hover {
      background-color: gray;
      color: white;
    }
    ::placeholder {
      color: gray;
    }
  }
`;

const Buttons = styled.div`
  padding: 0 5px;
  display: flex;
  justify-content: flex-end;
  span {
    :hover {
      cursor: pointer;
    }
  }
`;

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
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
  return (
    <Draggable draggableId={boardId} index={index} key={boardId}>
      {(magic, snapshot) => (
        <Wrapper
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <Buttons>
            <span className="material-symbols-outlined">update</span>
            <span className="material-symbols-outlined">delete</span>
          </Buttons>
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`add task on ${boardId}`}
            />
          </Form>
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
                  <DraggableCard
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    index={index}
                    boardId={boardId}
                    key={toDo.id}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
