import {Link} from "react-router-dom";
import styled from "@emotion/styled";

const LogoImage = styled.img `
  width: 50px;
  height: auto;
  padding: 10px 10px 10px 25px;
  transition: transform 0.3s ease; // 부드러운 애니메이션 효과

  &:hover {
    transform: scale(1.1); // 이미지 확대
  }
`

const LogoImg = () => {
    return (
        <Link to="/">
            <LogoImage src={"/asset/img/logo.png"} alt={"logoImg"} />
        </Link>
    );
};
export default LogoImg;