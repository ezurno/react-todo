import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { cardChanger, popUpState, toDoState } from "../Atoms";

const PopUp = styled.div<IPopUp>`
  display: ${(props) => (props.popUp ? "default" : "none")};
  color: ${(props) => props.theme.fontColor};
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
`;

const PopUpMenu = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  text-align: center;
  background: ${(props) => props.theme.boardColor};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const PopUpExit = styled.div`
  width: 100%;
  button {
    float: right;
    background-color: inherit;
    border: none;
    margin-right: 15px;
    color: white;
  }
`;

const PopUpForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    color: ${(props) => props.theme.fontColor};
    border: none;
    width: 100%;
    background-color: inherit;
    border-bottom: 1px solid ${(props) => props.theme.fontColor};
    margin: 15px 0px;
    height: 36px;
    ::placeholder {
      text-align: center;
    }
  }
`;

const PopUpButton = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
  button {
    border-radius: 30px;
    height: 50px;
    width: 50px;
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.fontColor};
    border: none;
  }
`;

interface IPopUp {
  popUp: boolean;
}

interface IChangeCard {
  changeCard: string;
}

function PopUpTool() {
  const { register, setValue, handleSubmit } = useForm<IChangeCard>();
  const setToDos = useSetRecoilState(toDoState);
  const [cardChange, setCardChange] = useRecoilState(cardChanger);
  const [popUp, setPopUp] = useRecoilState(popUpState);

  // const addBoard = ({ addBoard }: IAddBoard) => {
  //   setToDos((allBoards) => {
  //     const newBoards = { ...allBoards, [addBoard]: [] };
  //     return newBoards;
  //   });
  //   setValue("addBoard", "");
  //   setPopUp((current) => !current);
  // };

  const changeCard = ({ changeCard }: IChangeCard) => {
    setToDos((allBoards) => {
      const newToDo = {
        id: Date.now(),
        text: changeCard,
      };

      const newBoard = [
        ...allBoards[cardChange.boardId].slice(0, cardChange.index),
        newToDo,
        ...allBoards[cardChange.boardId].slice(cardChange.index + 1),
      ];

      return {
        ...allBoards,
        [cardChange.boardId]: newBoard,
      };
    });

    popUpAdd();
  };

  const popUpAdd = () => {
    setPopUp((current) => !current);
  };

  return (
    <PopUp popUp={popUp}>
      <PopUpMenu>
        <PopUpExit onClick={popUpAdd}>
          <button>X</button>
        </PopUpExit>

        <PopUpForm onSubmit={handleSubmit(changeCard)}>
          <h1>일정 수정하기</h1>
          <input
            {...register("changeCard", { required: true })}
            type="text"
            placeholder="일정을 입력하세요."
          ></input>
          <PopUpButton>
            <button>저장</button>
          </PopUpButton>
        </PopUpForm>
      </PopUpMenu>
    </PopUp>
  );
}

export default PopUpTool;
