import styled from "@emotion/styled";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  width: 240px;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  opacity: 0.9;
  transition: transform 0.1s ease; // 0.3초 동안 천천히 변화
  &:hover{
    transform: scale(1.05);
    opacity: 1;
  }
  &:active{
    transform: scale(0.99);
    opacity: 1;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none; // 밑줄 제거
  color: inherit; // 링크의 기본 색상을 상속받습니다.

`;

const Img = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 170px;
  object-fit: cover;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  margin: 5px;
`;

const Price = styled.label`
  color: orange;
  margin: 5px;
`;


export const PostComponent = ({ boardIndex, boardTitle, boardPrice, boardFileIndex }) => {
    return (
        <StyledLink to={`/post/${boardIndex}`}>
            <Wrapper>
                <Img src={boardFileIndex} alt={boardTitle}></Img>
                <Title>{boardTitle}</Title>
                <Price>{boardPrice}원</Price>
            </Wrapper>
        </StyledLink>

    );
};
