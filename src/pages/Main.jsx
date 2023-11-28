import useMessageStore from "../store/useMessageStore";
import styled from "@emotion/styled";
import { useEffect } from "react";

const TestDiv = styled.div`
  margin-top: 500px;
`;

const Main = () => {
    const message = useMessageStore(state => state.message);
    const setMessage = useMessageStore(state => state.setMessage);



    // 업로드 성공 후 메시지
    useEffect(() => {
        if (message) {
            // 메시지가 있으면 3초 후에 메시지를 초기화합니다.
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000);

            // 컴포넌트가 언마운트될 때 타이머를 제거합니다.
            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    return (
        <TestDiv>
            {message && <div>{message}</div>}
        </TestDiv>
    );
}

export default Main;
