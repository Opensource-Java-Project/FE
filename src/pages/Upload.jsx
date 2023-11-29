import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postUpload } from "../apis/postDataApi";
import styled from "@emotion/styled";
import useMessageStore from "../store/useMessageStore";

const UploadWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50vh;
  margin-top: 200px;
  padding: 20px;
  transform: translateX(45%);
  border-radius: 10px;
  border: solid;
  border-width: 2px;
  border-color: #c2c2c2;
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
  height: auto;
  min-height: 250px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputFile = styled.input`
  display: none;
`;
const FileSpan = styled.span`
  background-color: #3a3a3a;
  border-radius: 10px;
  padding: 10px 15px;
  color: white;
`;
const DragNDrop = styled.span`
  margin-top: 27%;
  opacity: 0.3;
`;
const PreviewImg = styled.img`
  margin-top: 20px;
  max-width: 100%;
  max-height: 250px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.input`
  margin: 10px;
  background-color: #eee;
  border: none;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 15px;
`;
const Content = styled.textarea`
  margin: 10px;
  background-color: #eee;
  border: none;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 15px;
  min-height: 80px;
  resize: none;
`;
const Price = styled.input`
  margin: 10px;
  background-color: #eee;
  border: none;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 15px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px 0px;
  justify-content: center;
  letter-spacing: 1px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  display: block;
  background-color: #3a3a3a;
  color: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  &:active{
    box-shadow: none;
    transition: background-color 0.2s ease-out;
  }
`;

const Upload = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredContent, setEnteredContent] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [contentImageUrl, setContentImageUrl] = useState(null);

    const setMessage = useMessageStore(state => state.setMessage);
    const navigate = useNavigate();

    // span 이미지 업로드 ref
    const inputRef = useRef(null);

    // 로직
    const readImage = (image) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            setContentImageUrl(String(e.target?.result));
        };
        reader.readAsDataURL(image);
    };
    const onDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            readImage(file);
            setSelectedImages([file]);
        }
    };

    // 핸들러
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            readImage(file);
            setSelectedImages([file]);
        }
    };

    const handleTitleChange = (event) => {
        setEnteredTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setEnteredContent(event.target.value);
    };

    const handleSpanClick = () => {
        inputRef.current.click();
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        // 숫자와 소수점만 허용
        setEnteredPrice(value.replace(/[^0-9]/g, ''));
    };
    const handlePricePaste = (event) => {
        event.preventDefault();
        const pasteData = (event.clipboardData || window.clipboardData).getData('text');
        // 붙여넣기 데이터에서 숫자와 소수점만 추출
        const numbersOnly = pasteData.replace(/[^0-9]/g, '');
        setEnteredPrice(numbersOnly);
    };




    const handleSubmit = async () => {
        // 멀티 파트/폼데이터 형식으로 보냄, 서버에서도 관리가 수월해짐
        const formData = new FormData();
        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }
        formData.append('title', enteredTitle);
        formData.append('content', enteredContent);
        formData.append('price', enteredPrice);

        const userId = localStorage.getItem('userId');
        formData.append('userId', userId);

        try {
            const response = await postUpload(formData);
            if (response.status === 200) {
                setMessage('업로드 성공');
                navigate('/');
            } else {
                setMessage('업로드 실패');
            }
        } catch (error) {
            console.error('에러:', error);
        }
    };

    return (
        <UploadWrapper>
            <UploadArea onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
                <FileSpan onClick={handleSpanClick} >파일 업로드</FileSpan>


                <InputFile
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={"image/*"}
                    onChange={handleImageChange}
                />
                {/* 상태 기반으로 바꾸거나 컴포넌트화 시키면 좀 더 재사용성 높아짐 */}
                {contentImageUrl ? <PreviewImg src={contentImageUrl} alt="미리보기" /> : <DragNDrop>드래그 앤 드랍</DragNDrop>}

            </UploadArea>
            <InputDiv>
                <Title
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={enteredTitle}
                    onChange={handleTitleChange}
                />
                <Content
                    placeholder="내용을 입력하세요"
                    value={enteredContent}
                    onChange={handleContentChange}
                />
                <Price
                    type="text"
                    placeholder="가격을 입력하세요"
                    value={enteredPrice}
                    onChange={handlePriceChange}
                    onPaste={handlePricePaste}
                />
                <Button onClick={handleSubmit}>업로드</Button>
            </InputDiv>

        </UploadWrapper>
    );
};

export default Upload;
