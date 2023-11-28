import instance from "./instance";


// 중복 확인 요청 api
export const checkDuplicated = async (email) => {
    try {
        return await instance.post('/checkDuplicatedEmail', { memberEmail: email });
    } catch (error) {
        console.error('에러 발생:', error);
    }
};


// 회원가입 요청 api
export const postUser = async (email, password) => {
    try {
        return await instance.post('/register', { memberEmail: email, memberPassword: password });
    } catch (error) {
        console.error('에러 발생:', error);
    }
};

// 로그인 요청 api
export const postLogin = async (email, password) => {
    try {
        return await instance.post('/login', { memberEmail: email, memberPassword: password });
    } catch (error) {
        console.error('에러 발생:', error);
    }
};

// 예약하기 api
export const postDate = async (reservationData, postId, setOpen) => {
    try {
        const response = await instance.post('/reservations', {
            boardIndex: postId, // 게시글 ID는 함수의 파라미터로 전달됩니다.
            ...reservationData
        });
        //test console
        console.log('Reservation submitted:', response.data);

        setOpen(false); // 예약창 닫기, 이 함수도 파라미터로 전달됩니다.
    } catch (error) {
        console.error('Error submitting reservation:', error);
        // 필요한 경우, 에러 처리를 위한 추가적인 로직을 여기에 구현할 수 있습니다.
    }

};



// 업로드 api
// 멀티파트/폼데이터 형식으로 보냄, 서버에서도 관리가 수월해짐.
export const postUpload = async (formData) => {
    try {
        return await instance.post('/upload', formData);
    } catch (error) {
        console.error('Error submitting reservation:', error);
    }
};


// try...catch 문 제거하고 각 API 호출할 때 try...catch 문을 사용하여 에러를 잡으려고 했으나 수정하기 매우 귀찮으므로 패스.