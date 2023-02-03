import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./Atoms";
import Board from "./components/Board";
import DraggableCard from "./components/DraggableCard";
const Wrapper = styled.div`
  display: flex;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (destination?.index === undefined) return; // 목적지가 없으면 실행 x

    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   // 1) Delete item on source.index
    //   console.log("Delete item on", source.index);
    //   console.log(toDosCopy);
    //   toDosCopy.splice(source.index, 1); // splice로 index의 위치에서 1개의 index를 추출
    //   console.log("Deleted item");
    //   console.log(toDosCopy);
    //   // 2) Put back the item on the destination.index
    //   console.log("Put back", draggableId, "on ", destination.index);
    //   toDosCopy.splice(destination.index, 0, draggableId); // splice로 index의 위치에서 수정하지 않고 draggableId를 주입
    //   console.log(toDosCopy);
    //   return toDosCopy;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default App;
