import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import styled from "@emotion/styled";
import {useUserStore} from "../../../../store/useUserStore";
import {useNavigate} from "react-router-dom";

const StyledButton = styled(animated.button)`
  padding: 20px 60px;
  letter-spacing: 1px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 15px;
  display: block;
  background-color: #3a3a3a;

  &:hover {
    background-color: #ff97a8;
    color: #3a3a3a;
    transform: scale(1.05); // 호버 시 확대
    transition: background-color 0.3s ease-out;
  }

  &:active {
    transform: scale(0.95); // 클릭 시 축소
  }
`;

const BubbleLeft = styled(animated.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 0;
  top: 25px;
  border-radius: 15px;
  background-color: #3a3a3a;
`;
const BubbleLeft2 = styled(animated.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  top: 31px;
  border-radius: 15px;
  background-color: #3a3a3a;
`;

const BubbleRight = styled(animated.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  top: 25px;
  border-radius: 15px;
  background-color: #3a3a3a;
`;
const BubbleRight2 = styled(animated.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  top: 31px;
  border-radius: 15px;
  background-color: #3a3a3a;
`;

const UploadButton = () => {
    const [hover, setHover] = React.useState(false);
    const userId = useUserStore(state => state.userId);
    const navigate = useNavigate();

    // 이벤트 핸들러
    const submitHandler = () => {
        // 로그인 상태 확인
        if (!userId) {
            const isRedirect = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
            if (isRedirect) {
                navigate('/login');
            }
            return;
        } else {
            navigate('/upload');
        }
    };
// 왼쪽 버블 애니메이션
    const leftBubbleAnimation = useSpring({
        to: { opacity: hover ? 1 : 0, transform: hover ? 'translateX(37vw)' : 'translateX(42vw)', backgroundColor: hover ? '#ff97a8' : '#3a3a3a' },
        from: { opacity: 1, transform: 'translateX(37vw)' },
        config: { tension: 200, friction: 12 }
    });
    // 왼쪽 버블 애니메이션2
    const leftBubbleAnimation2 = useSpring({
        to: { opacity: hover ? 1 : 0, transform: hover ? 'translateX(34vw)' : 'translateX(42vw)', backgroundColor: hover ? '#ff97a8' : '#3a3a3a' },
        from: { opacity: 1, transform: 'translateX(34vw)' },
        config: { tension: 200, friction: 12 }
    });

    // 오른쪽 버블 애니메이션
    const rightBubbleAnimation = useSpring({
        to: { opacity: hover ? 1 : 0, transform: hover ? 'translateX(-40vw)' : 'translateX(-45vw)', backgroundColor: hover ? '#ff97a8' : '#3a3a3a' },
        from: { opacity: 1, transform: 'translateX(-40vw)' },
        config: { tension: 200, friction: 12 }
    });
    // 오른쪽 버블 애니메이션2
    const rightBubbleAnimation2 = useSpring({
        to: { opacity: hover ? 1 : 0, transform: hover ? 'translateX(60vw)' : 'translateX(55vw)', backgroundColor: hover ? '#ff97a8' : '#3a3a3a' },
        from: { opacity: 1, transform: 'translateX(60vw)' },
        config: { tension: 200, friction: 12 }
    });



    // 버튼 애니메이션
    const buttonAnimation = useSpring({
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        config: { tension: 300, friction: 10 }
    });




    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <StyledButton style={buttonAnimation} onClick={submitHandler} >업로드</StyledButton>
            <BubbleLeft style={leftBubbleAnimation} />
            <BubbleLeft2 style={leftBubbleAnimation2}/>
            <BubbleRight style={rightBubbleAnimation} />
            <BubbleRight2 style={rightBubbleAnimation2} />
        </div>
    );
};

export default UploadButton;
