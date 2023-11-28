import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // 쿠키를 포함시키기 위한 설정
    // timeout: 1000 // 1초가 지나도 응답이 없으면 실패
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 409 || error.response.status === 401)) {
            // 401 또는 409 상태 코드에 대한 커스텀 처리
            return Promise.resolve(error.response);
        }
        return Promise.reject(error);
    }
);


export default instance;