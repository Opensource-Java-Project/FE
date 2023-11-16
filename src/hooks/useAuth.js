import instance from "../apis/instance";
import useLoggedInStore from "../store/useLoggedInStore";

const useAuth = () => {
    const { setLoggedIn } = useLoggedInStore();

    // 로그인 상태 여부 확인
    const checkLoginStatus = async () => {
        try {
            const response = await instance.get('/session-status');
            setLoggedIn(response.data.isLoggedIn); // Zustand 스토어에 로그인 상태 저장
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };


    // 로그아웃
    const logout = async () => {

        //test, false = logut 상태, true = login상태
        setLoggedIn(false); // 로그아웃 상태 업데이트

        try {
            // 백엔드 로그아웃 엔드포인트와 통신
            await instance.post('/logout');
            setLoggedIn(false); // 로그아웃 상태 업데이트
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // 로그인 함수 (필요한 경우)
    const login = async (credentials) => {


        //test, false = logut 상태, true = login상태
        setLoggedIn(true); // 로그아웃 상태 업데이트

        try {
            await instance.post('/login', credentials);
            setLoggedIn(true); // 로그인 상태로 설정
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return { checkLoginStatus, logout, login };
};

export default useAuth;