import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../apis/authApi";
import { useUserLoginStore } from "../store/useUserInputStore";
import {useLoggedIn} from "../hooks/useLoggedIn";


const Login = () => {

    // userState
    const { enteredId, setEnteredId, enteredPassword, setEnteredPassword } = useUserLoginStore()
    // msg state
    const [message, setMessage] = useState('');
    // navigate 함수
    const navigate = useNavigate();

    // 로그인 쿠키 확인 후 있다면 /main으로
    useLoggedIn('/main');

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

        const response = await postUser(enteredId, enteredPassword);

        if (response.status === 200) {
            // 제출 성공
            navigate('/main');
        } else if (response.status === 401){
            // 아이디 혹은 비밀번호를 확인해주세요.
            setMessage('아이디 혹은 비밀번호를 확인해주세요.');
        } else {
            // 다시 제출해주세요.
            setMessage('다시 제출해주세요.');
        }
    }
    // 입력 박스 focus 핸들러
    const handleFocus = () => {
        setMessage('');
    }


    return (
        <>
            <form onSubmit={submitHandler}>

                <div>
                    <label>ID :</label>
                    <input type="text" maxLength={21} value={enteredId} placeholder="아이디를 입력하세요." onChange={idHandler} onFocus={handleFocus} />

                    <label>PW :</label>
                    <input type="password" maxLength={21} value={enteredPassword} placeholder="비밀번호를 입력하세요." onChange={passwordHandler} onFocus={handleFocus}/>
                    <button type="submit">제출</button>
                </div>

                <div>
                    <p onClick={() => navigate('/main')}>회원가입</p>
                </div>


                <label>{message}</label>
            </form>
        </>
    );
};

export default Login;