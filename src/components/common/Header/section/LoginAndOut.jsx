// LoginAndOut.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";
import ProfileImg from "./ProfileImg";
import useLoggedInStore from "../../../../store/useLoggedInStore";
import styled from "@emotion/styled";
import { useTransition, animated } from '@react-spring/web';

const LogInButton = styled.p `
  background-color: #ff9292;
  border-radius: 5px;
  margin-right: 30px;
  color: white; /* 텍스트 색상 */
  padding: 10px 20px; /* 안쪽 여백 */
  text-align: center; /* 텍스트 중앙 정렬 */
  text-decoration: none; /* 밑줄 제거 */
  display: inline-block; /* 인라인 블록 요소로 표시 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  border: none; /* 테두리 제거 */
`

const LogOutButton = styled.p `
  padding-right: 10px;
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`


const LoginAndOut = () => {
    const { logout } = useAuth();
    const isLoggedIn = useLoggedInStore(state => state.isLoggedIn);

    const transitions = useTransition(isLoggedIn, {
        from: { opacity: 1, transform: 'translate3d(100%,0,0)' },
        enter: { transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-80%,0,0' },
        config: { duration: 300 }
    });

    const handleLogout = async () => {
        await logout();
    };

    return transitions((style, item) =>
        item ? (
            <animated.div style={style}>
                <RightContainer>
                    <LogOutButton onClick={handleLogout}>LogOut</LogOutButton>
                    <ProfileImg/>
                </RightContainer>
            </animated.div>
        ) : (
            <animated.div style={style}>
                <Link to={'/login'}>
                    <LogInButton>Login</LogInButton>
                </Link>
            </animated.div>
        )
    );
};

export default LoginAndOut;
