// 로그인 쿠키 확인 후 지정한 path로 리디렉션 하는 커스텀 훅
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLoggedIn = (redirectPath) => {
    const navigate = useNavigate();

    useEffect(() => {
        // document.cookie 는 안전하지 않은 방법이므로 다른 방법을 쓰는 것을 추천, Redis
        // 세션인증 이용하기로 함
        const isLoggedIn = document.cookie.includes('loggedIn=true; max-age=3600');

        if (isLoggedIn) {
            navigate(redirectPath);
        }
    },[navigate, redirectPath]);
};