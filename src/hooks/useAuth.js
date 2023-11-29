import instance from "../apis/instance";
import useLoggedInStore from "../store/useLoggedInStore";
import {useUserStore} from "../store/useUserStore";
import {postLogin} from "../apis/postDataApi";
import {useNavigate} from "react-router-dom";


const useAuth = () => {
    const { setLoggedIn } = useLoggedInStore();
    // 현재 로그인한 사용자 정보
    const { setUser } = useUserStore();
    // 라우팅
    const navigate = useNavigate();

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
        const token = localStorage.getItem('isLoggedInToken');


        //test, false = logut 상태, true = login상태
        // localStorage.removeItem('isLoggedInToken'); // 로그인 토큰 파기
        // localStorage.removeItem('userId'); // userId 파기
        // setLoggedIn(false); // 로그아웃 상태 업데이트
        // setUser(null);
        // navigate('/');

        try {
            // 백엔드 로그아웃 엔드포인트와 통신
            // 헤더에 토큰을 포함시켜 보냄
            await instance.post('/logout',{},{headers: {'Authorization': `Bearer ${token}`}});
            // 세션 파기 요청

            localStorage.removeItem('isLoggedInToken'); // 로그인 토큰 파기
            localStorage.removeItem('userId'); // userId 파기
            setLoggedIn(false); // 로그아웃 상태 업데이트
            setUser(null);
            navigate('/');

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // 로그인 함수
    const login = async (email, password) => {

        // test
        // setLoggedIn(true);
        // test for userId
        // const userId = "wns2349@naver.com";
        // setUser(userId);


        try {
            const response = await postLogin(email, password); // 로그인 api

            if (response.data.auth ==='true') {
                const token = response.data.token; // 백엔드에서 생성한 토큰 저장

                // 백엔드 연결
                const userId = response.data.userId;



                localStorage.setItem('isLoggedInToken', token);  // 로그인 인증 로컬 스토리지
                setUser(userId);

                // localStorage.setItem('userId', userId); // 해당 사용자 인증 로컬 스토리지, 해당 코드 zustand로 대체 따라서 안씀

                await checkLoginStatus(token); // 토큰 인증 후 로그인 상태 업데이트
            } else {
                console.log("로그인 인증 실패");
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return { checkLoginStatus, logout, login };
};

export default useAuth;