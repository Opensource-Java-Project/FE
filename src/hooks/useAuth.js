import instance from "../apis/instance";
import useLoggedInStore from "../store/useLoggedInStore";
import {postLogin} from "../apis/postDataApi";

const useAuth = () => {
    const { setLoggedIn } = useLoggedInStore();

    // 토큰 유효성 검사 후 zustand 전역 LoggenIn 상태 업데이트
    const checkLoginStatus = async (token) => {
        if (token) {
            // 서버에 토큰을 전송하여 유효성 검사
            try {
                const response = await instance.get('/verifyToken', { headers: { 'Authorization': `Bearer ${token}` } });
                // 200이면 로그인
                if (response.status === 200) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Error during login status check:', error);
            }
        }
    };


    // 로그아웃
    const logout = async () => {
        // 로그아웃 시 데이터 베이스 토큰 파기를 위해 데이터 보내기 위한 데이터
        const token = localStorage.getItem('isLoggedIn');


        //test, false = logut 상태, true = login상태
        setLoggedIn(false); // 로그아웃 상태 업데이트

        try {
            // 백엔드 로그아웃 엔드포인트와 통신
            // 헤더에 토큰을 포함시켜 보냄
            await instance.post('/logout',{},{headers: {'Authorization': `Bearer ${token}`}});
            // 세션 파기 요청
            // 로컬 스토리지 파기
            localStorage.removeItem('isLoggedIn');
            setLoggedIn(false); // 로그아웃 상태 업데이트
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // 로그인 함수
    const login = async (email, password) => {



        // test
        setLoggedIn(true);


        try {
            const response = await postLogin(email, password); // 로그인 api

            const token = response.data.token; // 백엔드에서 생성한 토큰 저장
            localStorage.setItem('isLoggedIn', token);

            // 상태 확인 후 성공했다면 백엔드에서 쿠키 설정해주거나 로컬스토리지에 쿠키 저장
            checkLoginStatus(token);

        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return { checkLoginStatus, logout, login };
};

export default useAuth;