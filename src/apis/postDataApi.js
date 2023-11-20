import instance from "./instance";

export const checkDuplicated = async (id) => {
    try {
        return await instance.post('/check-duplicated-id', { id });
    } catch (error) {
        console.error('에러 발생:', error);
    }

};

export const postUser = async (id, password) => {
    try {
        return await instance.post('/user', { id, password });
    } catch (error) {
        console.error('에러 발생:', error);
    }
};

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
