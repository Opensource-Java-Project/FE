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
        const sessionToken = localStorage.getItem('LoggedInToken');

        // 데이터 확인 테스트 로그
        console.log('로그아웃 요청시 보낼 토큰 값이 있는지 :', sessionToken);

        //test, false = logut 상태, true = login상태
        localStorage.removeItem('isLoggedInToken'); // 로그인 토큰 파기
        localStorage.removeItem('userId'); // userId 파기
        setLoggedIn(false); // 로그아웃 상태 업데이트
        setUser(null);
        navigate('/login');

        try {
            // 백엔드 로그아웃 엔드포인트와 통신
            // 헤더에 토큰을 포함시켜 보냄
            const response = await instance.post('/logout',{},{headers: {'Authorization': `Bearer ${sessionToken}`}});
            // 세션 파기 요청
            if (response.status === 200) {
                localStorage.removeItem('LoggedInToken'); // 로그인 토큰 파기
                localStorage.removeItem('userId'); // userId 파기
                setLoggedIn(false); // 로그아웃 상태 업데이트
                setUser(null); // 유저 상태 초기화
                navigate('/login');
            } else {
                console.log("로그아웃 실패");
            }

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // 로그인 함수
    const login = async (email, password) => {

        // test for userId
        const userId = "wns2349@naver.com";
        setUser(userId);
        setLoggedIn(true);

        try {
            const response = await postLogin(email, password); // 로그인 api

            if (response.data.auth === true) {
                const sessionToken = response.data.token; // 백엔드에서 생성한 토큰 저장

                // 데이터 확인 테스트 콘솔
                console.log('로그인 완료', response);


                // 백엔드 연결
                const userId = response.data.userId;
                localStorage.setItem('LoggedInToken', sessionToken);  // 로그인 인증 로컬 스토리지
                setUser(userId);
                setLoggedIn(true);
                // localStorage.setItem('userId', userId); // 해당 사용자 인증 로컬 스토리지, 해당 코드 zustand로 대체 따라서 안씀

                // await checkLoginStatus(token); // 토큰 인증 후 로그인 상태 업데이트 ,
                    return 200;
            } else {
                //로그인 실패 표새
                return 401;
                console.log("로그인 인증 실패");
            }
        } catch (error) {
            return 500;
            console.error('Login failed:', error);
        }
    };



    return { checkLoginStatus, logout, login };
};

export default useAuth;