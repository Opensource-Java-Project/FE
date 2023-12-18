import styled from "@emotion/styled";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  width: 700px;
  //max-width: 700px;
  height: 135px;
  max-height: 135px;
  display: flex;
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


const ImageContainer = styled.div`
  border-radius: 8px;
  width: 130px;
  height: 130px;
  overflow: hidden; /* 이미지 넘침을 숨김 */
`;

const Img = styled.img`
  width: 100%; /* 부모 요소인 ImageContainer에 맞게 이미지 크기 조절 */
  height: 100%;
  object-fit: cover; /* 이미지가 컨테이너에 맞게 잘리지 않고 비율을 유지하도록 함 */
  object-position: center;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 20px 20px 15px 20px;
  font-size: 50px;
  letter-spacing: 2px;
  color: #232323;
`;

const Price = styled.label`
  color: orange;
  font-size: 20px;
  margin: 5px 5px 5px 20px;
`;


export const MyPostComponent = ({ boardIndex, boardTitle, boardPrice, boardFileIndex }) => {
    return (
        <StyledLink to={`/post/${boardIndex}`}>
            <Wrapper>
                <ImageContainer>
                    <Img src={boardFileIndex} alt={boardTitle}></Img>
                </ImageContainer>
                <ContentContainer>
                    <Title>{boardTitle}</Title>
                    <Price>{boardPrice}원/일</Price>
                </ContentContainer>
            </Wrapper>

        </StyledLink>

    );
};
