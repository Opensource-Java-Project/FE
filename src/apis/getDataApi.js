import instance from "./instance";

export const getUserData = async (path) => {
    try {
        const response = await instance.get(path);
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        throw error; // 에러를 던져 상위 컴포넌트나 호출 함수에서 처리할 수 있게 함
    }
};
