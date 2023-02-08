import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { popUpState, toDoState } from "../Atoms";

const Container = styled.div`
  height: 10vh;
  background-color: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.fontColor};
`;

const HeadLine = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: space-between;
`;

const PopUp = styled.div<IPopUp>`
  display: ${(props) => (props.popUp ? "default" : "none")};
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
  background: #fff;
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
  }
`;

const PopUpForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    border: none;
    width: 100%;
    border-bottom: 1px solid black;
    margin: 15px 0px;
    height: 36px;
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
    background-color: black;
    color: white;
  }
`;

interface IPopUp {
  popUp: boolean;
}

interface IAddBoard {
  addBoard: string;
}

const Option = styled.div``;

function Header() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [popUp, setPopUp] = useRecoilState(popUpState);
  const { register, setValue, handleSubmit } = useForm<IAddBoard>();

  const addBoard = ({ addBoard }: IAddBoard) => {
    setToDos((allBoards) => {
      const newBoards = { ...allBoards, [addBoard]: [] };
      return newBoards;
    });
    setValue("addBoard", "");
    setPopUp((current) => !current);
  };

  const popUpAdd = () => {
    setPopUp((current) => !current);
  };

  return (
    <Container>
      <PopUp popUp={popUp}>
        <PopUpMenu>
          <PopUpExit onClick={popUpAdd}>
            <button>X</button>
          </PopUpExit>

          <PopUpForm onSubmit={handleSubmit(addBoard)}>
            <h1>Add your board name</h1>
            <input
              {...register("addBoard", { required: true })}
              type="text"
              placeholder="board name"
            ></input>
            <PopUpButton>
              <button>SAVE</button>
            </PopUpButton>
          </PopUpForm>
        </PopUpMenu>
      </PopUp>
      <HeadLine>
        <h1>LEE TRELLO</h1>
        {/* <Option>
          <button onClick={popUpAdd}>추가</button>
        </Option> */}
      </HeadLine>
    </Container>
  );
}

export default Header;
