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
        const response = await instance.post('/api/reservations', {
            ...reservationData,
            postId, // 게시글 ID는 함수의 파라미터로 전달됩니다.
        });
        console.log('Reservation submitted:', response.data);
        setOpen(false); // 예약창 닫기, 이 함수도 파라미터로 전달됩니다.
    } catch (error) {
        console.error('Error submitting reservation:', error);
        // 필요한 경우, 에러 처리를 위한 추가적인 로직을 여기에 구현할 수 있습니다.
    }
};
