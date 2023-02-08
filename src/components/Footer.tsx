import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";

const Container = styled.div`
  height: 12vh;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${(props) => props.theme.bgColor};
    transition: color 0.3s ease-in-out;
    :hover {
      cursor: pointer;
      color: ${(props) => props.theme.fontColor};
    }
  }
`;

function footer() {
  return (
    <Container>
      <a href="https://github.com/ezurno/react-todo">
        <FaGithubSquare size={48} />
      </a>
    </Container>
  );
}

export default footer;
