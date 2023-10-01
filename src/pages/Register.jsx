import React, { useState } from "react";

const Register = () => {
    const [enterdId, setEnterdId] = useState('');
    const [isIdDuplicate, setIsIdDuplicate] = useState(false);

    const [enterdPassword, setEnterdPassword] = useState('');
    const [enterdConfimPassword, setEnterdConfirmPassword] = useState('');

    const idHandler = (event) => {
        setEnterdId(event.target.value);
    };
    const duplicateIdHandler = () => {

        if (isIdDuplicate === true) {
            //백엔드 연결하고 중복 여부 확인
        } else {
            //중복됐다고 출력
        }
    };
    const passwordHandler = (event) => {
        setEnterdPassword(event.target.value);
    };
    const confirmPasswordHandler = (event) => {
        setEnterdConfirmPassword(event.target.value);
    };
    const sumbmitHandler = (event) => {
        event.preventDefault();
        if ((isIdDuplicate === true) && (enterdPassword === enterdConfimPassword)) {
            //성공 로직 > 백엔드 보내고 로그인 페이지로 라우팅
        } else {
            //실패 로직
        }
    };
    return (
        <form onSubmit={sumbmitHandler}>
            <div>
                <label>ID :</label>
                <input type={"text"} maxLength={21} placeholder="아이디를 입력하세요." onChange={idHandler}/>
                <input type={"button"} value={"중복 확인"} onChange={duplicateIdHandler}/>
                {/* 백엔드랑 연결해서 중복 여부 출력*/}
                <label>PW :</label>
                <input type={"password"} maxLength={21} placeholder="비밀번호를 입력하세요." onChange={passwordHandler}/>
                <input type={"password"} maxLength={21} placeholder="비밀번호를 재입력하세요." onChange={confirmPasswordHandler}/>
                {/*  상태 비교해서 다르면 비밀번호 다르다고 출력  */}
                <button type={"submit"}>제출</button>
            </div>
        </form>

    );
}

export default Register;