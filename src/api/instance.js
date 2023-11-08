import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    timeout: 1000 // 1초가 지나도 응답이 없으면 실패
});

export default instance;