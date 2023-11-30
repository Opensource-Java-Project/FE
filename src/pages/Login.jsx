import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUserLoginStore } from "../store/useUserInputStore";
import {useLoggedInRedirect} from "../hooks/useLoggedInRedirect";
import useAuth from "../hooks/useAuth";
import styled from "@emotion/styled";
import {animated, useSpring} from "@react-spring/web";


const LoginWrapper = styled.div`
  text-align: center;
  margin-top: 15%;
  display: inline-block;
  width: 100%;
`;
const LogoImage = styled.img`
  margin-bottom: 25px;
  width: 180px;
  height: auto;
`;
const InputDiv = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ActionDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; // 필요한 너비 설정
`;
const Input = styled.input`
  background-color: #eee;
  border: none;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 15px;
  margin: 8px;
`;
const SignUp = styled.p`
  padding: 6px 10px;
  letter-spacing: 1px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px 12px;
  display: block;
  background-color: #ff97a8;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  &:active{
    box-shadow: none;
    transition: background-color 0.2s ease-out;
  }
`;
const SubmitButton = styled.button`
  padding: 6px 10px;
  letter-spacing: 1px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px 12px;
  display: block;
  background-color: #ff97a8;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  &:active{
    box-shadow: none;
    transition: background-color 0.2s ease-out;
  }
`;
const MSGLabel = styled.label`
  color: #707070;
`;



const Login = () => {

    // userState
    const { enteredId, setEnteredId, enteredPassword, setEnteredPassword } = useUserLoginStore()
    // msg state
    const [message, setMessage] = useState('');
    // navigate 함수
    const navigate = useNavigate();

    // 로그인 쿠키 확인 후 있다면 /으로
    useLoggedInRedirect('/');

    // 로그인 훅
    const { login } = useAuth();


    // Handler

    // ID 입력 핸들러
    const idHandler = (event) => {
        setEnteredId(event.target.value);
    };
    // PW 입력 핸들러
    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    };


    // 로그인 제출 핸들러
    const submitHandler = async (event) => {
        event.preventDefault();


        //
        // //test
        // const response= 200;

        // 백엔드 로그인 요청
        const response = await login(enteredId, enteredPassword);
        console.log(response)

        if (response === 200) {
            // 제출 성공
            navigate('/');
        } else if (response === 401){
            // 아이디 혹은 비밀번호를 확인해주세요.
            setMessage('아이디 혹은 비밀번호를 확인해주세요.');
        } else {
            // 다시 제출해주세요.

            // // test
            // login();

            setMessage('다시 제출해주세요.');
        }
    }
    // 입력 박스 focus 핸들러
    const handleFocus = () => {
        setMessage('');
    }


    // 메시지 애니메이션
    const msgAnimation = useSpring({
        to: { opacity: 1, transform: 'translateX(0)' },
        from: { opacity: 0, transform: 'translateX(-10%)' },
        reset: true, // 메시지 변경시마다 애니메이션 재시작
    });

    return (
        <>
            <form onSubmit={submitHandler}>
                <LoginWrapper>
                    <LogoImage src={"/asset/img/logo.png"} alt={"logoImg"} />
                    <div>
                        <InputDiv>
                            <Input type="text" /*minLength={7}*/ maxLength={21} value={enteredId} /*placeholder="Email" */ onChange={idHandler} onFocus={handleFocus} />
                            <Input type="password" /*minLength={7}*/ maxLength={21} value={enteredPassword} placeholder="Password" onChange={passwordHandler} onFocus={handleFocus}/>
                        </InputDiv>

                        <ActionDiv>
                            <SignUp onClick={() => navigate('/register')}>Sign Up</SignUp>
                            <SubmitButton type="submit">Sign In</SubmitButton>
                        </ActionDiv>
                    </div>
                    <animated.div style={msgAnimation}>
                        <MSGLabel>{message}</MSGLabel>
                    </animated.div>
                </LoginWrapper>
            </form>
        </>
    );
};

export default Login;