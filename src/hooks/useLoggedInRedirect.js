// 로그인 쿠키 확인 후 지정한 path로 리디렉션 하는 커스텀 훅
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserDataStore from "../store/useLoggedInStore";

export const useLoggedInRedirect = (redirectPath) => {
    const navigate = useNavigate();
    const isLoggedIn = useUserDataStore(state => state.isLoggedIn);

    useEffect(() => {
        // document.cookie 는 안전하지 않은 방법이므로 다른 방법을 쓰는 것을 추천, Redis
        // 백엔드 세션인증 이용 백엔드에서 UUID가 포함된 쿠키를 클라이언트 쿠키에 저장 후 비교, 이후 백엔드로 요청할 때는 쿠키가 포함되어 백엔드에서 로직 처리

        if (isLoggedIn) {
            navigate(redirectPath);
        }
    },[navigate, redirectPath, isLoggedIn]);
};