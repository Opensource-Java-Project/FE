import instance from "./instance";


// 중복 확인 요청 api
export const checkDuplicated = async (email) => {

        return await instance.post('/checkDuplicatedEmail', { memberEmail: email });

};


// 회원가입 요청 api
export const postUser = async (email, password) => {
        return await instance.post('/register', { memberEmail: email, memberPassword: password });
};

// 로그인 요청 api
export const postLogin = async (email, password) => {
        return await instance.post('/login', { memberEmail: email, memberPassword: password });
};

// 예약하기 api
export const postDate = async (reservationData, postId, setOpen) => {
        return await instance.post('/reservations', {
            boardIndex: postId, // 게시글 ID는 함수의 파라미터로 전달됩니다.
            ...reservationData
        });
        setOpen(false); // 예약창 닫기, 이 함수도 파라미터로 전달됩니다.
};



// 업로드 api
// 멀티파트/폼데이터 형식으로 보냄, 서버에서도 관리가 수월해짐.
export const postUpload = async (formData) => {
        return await instance.post('/upload', formData);
};


// try...catch 문 제거하고 각 API 호출할 때 try...catch 문을 사용하여 에러를 잡으려고 했으나 수정하기 매우 귀찮으므로 패스.