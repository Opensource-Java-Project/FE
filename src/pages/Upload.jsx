import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {postUpload} from "../apis/postDataApi";
import styled from "@emotion/styled";
import useMessageStore from "../store/useMessageStore";

const TestDiv = styled.div`

  margin-top: 500px;
`;


const Upload = () => {

    //TODO: 로그인 안되어있으면 메인페이지로 리디렉션

    // 상태
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredContent, setEnteredContent] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const setMessage = useMessageStore(state => state.setMessage);

    const navigate = useNavigate();


    // 핸들러
    const handleTitleChange = (event) => {
        setEnteredTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setEnteredContent(event.target.value);
    };

    const handlePriceChange = (event) => {
        setEnteredPrice(event.target.value);
    };

    const handleImageChange = (event) => {
        setSelectedImages([...event.target.files]);
    };

    const handleSubmit = async () => {
        // 멀티파트/폼데이터 형식으로 보냄, 서버에서도 관리가 수월해짐.
        const formData = new FormData();
        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }
        formData.append('title', enteredTitle);
        formData.append('content', enteredContent);
        formData.append('price', enteredPrice);

        // 로컬 스토리지에서 userId 가져오기
        const userId = localStorage.getItem('userId');
        formData.append('userId', userId);

        try {

            // 백엔드 연결
            // const response = await postUpload(formData);
            // if (response.status === 200) {
            //     setMessage('업로드 성공');
            //     navigate('/');
            // } else {
            //     console.log('업로드 실패');
            //     setMessage('업로드 실패');
            // }


            // test
            navigate('/');
            setMessage("업로드 성공");



        } catch (error) {
            console.error('업로드 실패:', error);
        }
    };


    return (
      <TestDiv>
          <input
              type="text"
              placeholder="제목을 입력하세요"
              value={enteredTitle}
              onChange={handleTitleChange}
          />
          <textarea
              placeholder="내용을 입력하세요"
              value={enteredContent}
              onChange={handleContentChange}
          />
          <input
              type="text"
              placeholder="가격을 입력하세요"
              value={enteredPrice}
              onChange={handlePriceChange}
          />
          <input
              type="file"
              multiple
              onChange={handleImageChange}
          />
          <button onClick={handleSubmit}>업로드</button>
      </TestDiv>

    );

};

export default Upload;