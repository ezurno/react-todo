import styled from "styled-components";
import logo from "../img/Trellee.png";

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

function Header() {
  return (
    <Container>
      <HeadLine>
        <img src={logo} alt={logo} />
        {/* <Option>
          <button onClick={popUpAdd}>추가</button>
        </Option> */}
      </HeadLine>
    </Container>
  );
}

export default Header;
