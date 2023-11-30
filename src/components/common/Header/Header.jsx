// 스크롤 업하면 상단에 유지, 스크롤 다운하면 사라지기, 페이지 맨 위에서는 원래 자리
import LogoImg from "./section/LogoImg";
import LoginAndOut from "./section/LoginAndOut";
import styled from "@emotion/styled";
import UploadButton from "./section/UploadButton";

const Wrapper = styled.div`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  top: 0;
  left: 0;
  align-items: center;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 45px;
  display: flex;
  transition: top 0.3s;
  justify-content: space-between;
  z-index: 1002;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`



export const Header = ({children}) => {



    return (
        <Wrapper>
            <LogoImg />
            <UploadButton/>
            <RightContainer>
                <LoginAndOut />
                {children}
            </RightContainer>
        </Wrapper>
    );
};

