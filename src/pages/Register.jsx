import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { checkDuplicated, postUser } from "../apis/postDataApi";
import { css, keyframes} from "@emotion/react";
import { useUserLoginStore } from "../store/useUserInputStore";
import styled from "@emotion/styled";
import {useLoggedInRedirect} from "../hooks/useLoggedInRedirect";

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
    };

    // ID 중복 확인 핸들러
    const duplicateIdHandler = async () => {
        try {
            const response = await checkDuplicated(enteredId);
            setIsIdDuplicate(!response.data.isDuplicate);
        } catch (error) {
            console.error("ID 중복확인 오류:", error);
        }
    };

    // 비밀번호 입력 변경 핸들러
    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    // 비밀번호 확인 입력 변경 핸들러
    const confirmPasswordHandler = (event) => {
        setEnteredConfirmPassword(event.target.value);
    };

    // 회원가입 폼 제출 핸들러
    const submitHandler = async (event) => {
        event.preventDefault();


        // 로그인 성공 테스트
        // setShowModal(true);



        if (isIdDuplicate && enteredPassword === enteredConfirmPassword) {
            const response = await postUser(enteredId, enteredPassword);
            if (response.status === 200) {
                setShowModal(true);
            } else {
                setCheckPasswordMSG("회원가입 실패. 다시 시도해주세요.");
            }
        } else if (!isIdDuplicate) {
            setCheckPasswordMSG("중복 확인을 해주세요.");
        } else if (enteredPassword !== enteredConfirmPassword) {
            setCheckPasswordMSG("비밀번호가 다릅니다.");
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


    //css

    //animation
    const slideUp = keyframes`
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    `;

    // style
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
      width: 50vw;
      height: 50vh;
      background: white;
      padding: 20px;
      margin-left: 25%;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      z-index: 1001;
      animation: ${slideUp} 0.5s ease forwards;
    `;

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>ID :</label>
                    <input type="text" maxLength={21} value={enteredId} placeholder="아이디를 입력하세요." onChange={idHandler} />
                    <button type="button" onClick={duplicateIdHandler}>중복 확인</button>

                    <label>PW :</label>
                    <input type="password" maxLength={21} value={enteredPassword} placeholder="비밀번호를 입력하세요." onChange={passwordHandler} />
                    <input type="password" maxLength={21} value={enteredConfirmPassword} placeholder="비밀번호를 재입력하세요." onChange={confirmPasswordHandler} />

                    <label>{checkPasswordMSG}</label>
                    <button type="submit">제출</button>
                </div>
            </form>

            {/* 회원가입 성공 모달 */}
            {showModal && (
                <div css={overlayStyle}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h2>회원가입 성공</h2>
                        <button onClick={() => navigate('/login')}>로그인 하러가기</button>
                    </ModalContent>
                </div>
            )}
        </div>
    );
}

export default Register;
