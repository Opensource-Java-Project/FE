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

// 요청 인터셉터 추가
instance.interceptors.request.use(
    config => {
        // 요청을 보내기 전에 수행할 작업
        console.log('Request Interceptor:', config);
        // 필요하다면 요청 본문을 수정하거나, 헤더를 추가할 수 있음
        return config;
    },
    error => {
        // 요청 에러가 발생했을 때 수행할 작업
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
    response => {
        // 응답 데이터를 처리하기 전에 수행할 작업
        console.log('Response Interceptor:', response);
        return response;
    },
    error => {
        // 응답 에러가 발생했을 때 수행할 작업
        return Promise.reject(error);
    }
);

export default instance;