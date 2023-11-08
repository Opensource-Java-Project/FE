import instance from "./instance";

export const checkDuplicated = async (id) => {
    return await instance.post('/check-duplicated-id', { id });
};

export const registerUser = async (id, password) => {
    return await instance.post('/register', { id, password });
};

export const loginUser = async (id, password) => {
    return await instance.post('/login', { id, password });
};