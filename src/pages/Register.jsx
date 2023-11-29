import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { checkDuplicated, postUser } from "../apis/postDataApi";
import { css, keyframes} from "@emotion/react";
import { useUserLoginStore } from "../store/useUserInputStore";
import styled from "@emotion/styled";
import {useLoggedInRedirect} from "../hooks/useLoggedInRedirect";
import { useSpring, animated } from '@react-spring/web';

// style

//animation
const slideUp = keyframes`
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    `;

const overlayStyle = css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      // 모달 컨텐츠가 부모 요소의 100% 아래에서 시작하여 원래 위치로 이동
        // animation: ${slideUp} 0.5s ease forwards;
    `;

// 모달 컨텐츠 스타일
const ModalContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  left: 33%;
  top: 23%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 150px;
  border-radius: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  animation: ${slideUp} 0.5s ease forwards;
`;
const SubmitButton = styled.button`
  padding: 6px 10px;
  letter-spacing: 1px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  margin: 10px 12px 15px 12px;
  display: block;
  background-color: #ff97a8;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  &:active{
    box-shadow: none;
    transition: background-color 0.2s ease-out;
  }
`;
const IDDiv = styled.div `
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;
const PWDiv = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  background-color: #eee;
  border: none;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 15px;
  margin: 8px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  width: 100vw;
`;
const SignUpWrapper = styled.form`
  grid-column: 2/2; // 두 번째 컬럼에 배치
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
  align-items: start; // 요소들을 컬럼의 시작점에 정렬
  width: auto; // 필요한 경우 조정
  height: auto; // 필요한 경우 조정
`;
const MSGLabel = styled.label`
  margin-left: 15px;
  color: #707070;
`;


const Register = () => {
    // 사용자가 입력한 ID와 비밀번호를 저장하는 state
    const { enteredId, setEnteredId, enteredPassword, setEnteredPassword } = useUserLoginStore();
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    // 중복 확인 및 비밀번호 확인 메시지와 관련된 state
    const [isIdDuplicate, setIsIdDuplicate] = useState(false);
    const [checkPasswordMSG, setCheckPasswordMSG] = useState('');

    // 회원가입 성공 모달을 표시하는 state
    const [showModal, setShowModal] = useState(false);

    // react-router의 navigate 함수
    const navigate = useNavigate();

    // 로그인 쿠키 확인 후 있다면 /main으로
    useLoggedInRedirect('/');

    // ID 입력 변경 핸들러
    const idHandler = (event) => {
        setEnteredId(event.target.value);
        setCheckPasswordMSG('');
    };

    // ID 중복 확인 핸들러
    const duplicateIdHandler = async () => {
        setCheckPasswordMSG('');

        try {
            const response = await checkDuplicated(enteredId);

            if (response.status === 200) {
                setIsIdDuplicate(true); // true or 409
                setCheckPasswordMSG('중복확인 완료!');
            } else {
                setCheckPasswordMSG('중복된 이메일입니다.');
            }
        } catch (error) {
            console.error('Error during Email duplication check:', error);
        }
    };

    // 비밀번호 입력 변경 핸들러
    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
        setCheckPasswordMSG('');
    };

    // 비밀번호 확인 입력 변경 핸들러
    const confirmPasswordHandler = (event) => {
        setEnteredConfirmPassword(event.target.value);
        setCheckPasswordMSG('');
    };

    // 회원가입 폼 제출 핸들러
    const submitHandler = async (event) => {
        event.preventDefault();
        setCheckPasswordMSG('');


        // 로그인 성공 modal 테스트
        // setShowModal(true);

        const submitHandler = async (event) => {
            event.preventDefault();
            setCheckPasswordMSG('');

            try {
                const response = await postUser(enteredId, enteredPassword);
                if (response && response.status === 200) {
                    setShowModal(true);
                } else {
                    // 정상적인 응답이지만 상태 코드가 200이 아닌 경우
                    setCheckPasswordMSG("회원가입 실패. 다시 시도해주세요.");
                }
            } catch (error) {
                if (error.response) {
                    // 서버로부터의 응답이 있는 경우
                    console.error('Error:', error.response);
                    setCheckPasswordMSG("회원가입 실패: " + error.response.data);
                } else {
                    // 서버로부터의 응답이 없는 경우 (네트워크 문제 등)
                    console.error('Error:', error);
                    setCheckPasswordMSG("회원가입 중 오류가 발생했습니다.");
                }
            }
        };

    // 제출 완료 후
    useEffect(() => {
        let timer;
        if (showModal) {
            timer = setTimeout(() => {
                navigate('/login');
            }, 3000); // 회원가입 성공 모달이 표시된 후 3초 뒤에 자동으로 로그인 페이지로 이동
        }

        // 클린업 함수
        return () => {
            clearTimeout(timer);
        };
    }, [showModal, navigate]);


    // 메시지 애니메이션
    const msgAnimation = useSpring({
        to: { opacity: 1, transform: 'translateX(0)' },
        from: { opacity: 0, transform: 'translateX(-100%)' },
        reset: true, // 메시지 변경시마다 애니메이션 재시작
    });


    return (
        <>
        <Container>
            <SignUpWrapper onSubmit={submitHandler}>
                <IDDiv>
                    <Input type="email" minLength={7} maxLength={21} value={enteredId} placeholder="Email" onChange={idHandler} />
                    <SubmitButton type="button" onClick={duplicateIdHandler}>중복 확인</SubmitButton>
                </IDDiv>

                <PWDiv>
                    <Input type="password" minLength={7} maxLength={21} value={enteredPassword} placeholder="Password" onChange={passwordHandler} />
                    <Input type="password" minLength={7} maxLength={21} value={enteredConfirmPassword} placeholder="Repeat Password" onChange={confirmPasswordHandler} />
                </PWDiv>

                <SubmitButton type="submit">제출</SubmitButton>

                <animated.div style={msgAnimation}>
                    <MSGLabel>{checkPasswordMSG}</MSGLabel>
                </animated.div>
            </SignUpWrapper>

        </Container>

        {/* 회원가입 성공 모달 */}
        {showModal && (
            <div css={overlayStyle}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <h2>회원가입 성공</h2>
                    <SubmitButton onClick={() => navigate('/login')}>로그인 하러가기</SubmitButton>
                </ModalContent>
            </div>
        )}
    </>
    );
}

export default Register;

