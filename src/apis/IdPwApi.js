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
