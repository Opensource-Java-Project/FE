import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../../../store/useUserStore";


const UploadButton = () => {
    const userId = useUserStore(state => state.userId);

    const navigate = useNavigate();

    // Handler
    const submitHandler = () => {
        // 로그인 상태 확인
        if (!userId) {
            // 로그인이 필요하다는 경고 표시
            const isRedirect = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
            if (isRedirect) {
                navigate('/login');
            }
            return; // 함수 실행 중단
        } else {
            navigate('/upload');
        }
    };


    // TODO: 버튼 말고 움직이는 svg 나 뭔가 이목을 끌만한 것
    return (
        <>
            <button onClick={submitHandler} />
        </>

    );
};

export default UploadButton;