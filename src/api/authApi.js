import instance from "./instance";

export const checkDuplicated = async (id) => {
    return await instance.post('/check-duplicated-id', { id });
};

export const postUser = async (id, password) => {
    return await instance.post('/user', { id, password });
};
