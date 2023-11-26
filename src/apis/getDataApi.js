import instance from "./instance";


// postId 포함
export const getPost = async (postId) => {
    try {
        const response = await instance.get(`/getPost${postId}`);
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        // throw error; // 에러를 던져 상위 컴포넌트나 호출 함수에서 처리할 수 있게 함
    }
}

// // postId 뺀 코드
// export const getPost = async () => {
//     try {
//         const response = await instance.get(`/getPost`);
//         return response.data;
//     } catch (error) {
//         console.error('API 요청 중 오류 발생:', error);
//         // throw error; // 에러를 던져 상위 컴포넌트나 호출 함수에서 처리할 수 있게 함
//     }
// }

// 게시글 목록 받아오기
export const getPostList = async () => {
    try {
        const response = await instance.get('/getPostList');
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        // throw error; // 에러를 던져 상위 컴포넌트나 호출 함수에서 처리할 수 있게 함
    }
}

// Api 엔드포인트가 아직 확정되지 않았기 때문에 한 곳에서 쉽게 엔드포인트를 수정하기 위해 Api 요청을 각각 분리함