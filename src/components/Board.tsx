import React, { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../Atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div<{ isDragging: boolean }>`
  border: 0.5vh solid ${(props) => props.theme.middleColor};
  color: ${(props) => props.theme.fontColor};

  padding-top: 15px;
  margin: 4vh 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 20px;
  min-height: 70vh;
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.middleColor
      : props.isDraggingFromthis
      ? props.theme.middleColor
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
    background-color: ${(props) => props.theme.middleColor};
    font-size: 15px;
    font-weight: bold;
    height: 36px;
    text-align: center;
    transition: background-color 0.3s ease-in-out;
    color: ${(props) => props.theme.fontColor};
    ::placeholder {
      color: ${(props) => props.theme.cardColor};
    }

    :hover {
      background-color: ${(props) => props.theme.boardColor};
      color: ${(props) => props.theme.fontColor};
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
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`${boardId}에 작성`}
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
