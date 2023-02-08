import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, IToDo, toDoState } from "./Atoms";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PopUpTool from "./components/PopUpTool";
const Wrapper = styled.div`
  display: flex;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: auto;
`;
const Boards = styled.div<IBoardsProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const Body = styled.div``;

interface IBoardsProps {
  isDraggingOver: boolean;
  isDraggingFromthis: boolean;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(boardState);
  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;
    if (!destination) return;
    else if (source.droppableId === "boards") {
      setBoards((prev) => {
        const boardCopy = [...prev];
        const item = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination.index, 0, item);
        return boardCopy;
      });
    } else if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObject = boardCopy[source.index]; // object로 만들었기 떄문에 따로 잡아서 두는 것
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObject);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      //cross data
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObject = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObject);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <PopUpTool />

      <Header />
      <Body>
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Droppable droppableId="boards" direction="horizontal" type="board">
              {(magic, snapshot) => (
                <Boards
                  isDraggingOver={snapshot.isDraggingOver}
                  isDraggingFromthis={Boolean(snapshot.draggingFromThisWith)}
                  ref={magic.innerRef} // ref는 react 코드를 이용해 html 요소를 지정하고 가져올 수 있음 (주소지정)
                  {...magic.droppableProps}
                >
                  {boards.map((boardId, index) => (
                    <Board
                      boardId={boardId}
                      key={index}
                      toDos={toDos[boardId]}
                      index={index}
                    />
                  ))}
                  {magic.placeholder}
                </Boards>
              )}
            </Droppable>
          </Wrapper>
        </DragDropContext>
      </Body>
      <Footer />
    </>
  );
}
export default App;
