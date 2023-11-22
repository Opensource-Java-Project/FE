// Post
import React, {useEffect, useState} from "react";
import {getPost} from "../apis/getDataApi";
import {postDate} from "../apis/postDataApi";
import {useParams} from "react-router-dom";
import {Reservation} from "../components/Reservation/Reservation";
import styled from "@emotion/styled";


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 110px 1fr ;
  height: 100vh;
  width: 100vw;
`;
const Contents = styled.div`
  grid-row: 2/2;
  grid-column: 2/3;
`;
const ImageContainer = styled.div`
  text-align: center;
  background-color: #efefef;
  border-radius: 20px;
  height: 500px;
  z-index: 1000;
  position: relative; // 상대 위치 설정
  box-shadow: inset 2px 2px 16px 2px rgba(0, 0, 0, 0.2);
`;
const Img = styled.img`
  margin-top: 10px;
  height: 480px; // 또는 원하는 높이
  object-fit: contain;
  max-width: 100%;

`;

const NavigationButtonDiv = styled.div`
  position: absolute; // 절대 위치 설정
  top: 50%; // 컨테이너의 중간에 버튼을 배치
  width: 100%; // 컨테이너의 너비와 동일하게 설정
  display: flex;
  justify-content: space-between;
  z-index: 1001;
`;
const LeftNavButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  padding: 10px;
  margin-left: 25px;
  background: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-slider-left-4c0e713bfa2cd12bd959e6dd9ef456cd6fc094953c41e605f6b9a59bc1680686.svg) no-repeat;
`;

const RightNavButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  padding: 10px;
  margin-right: 15px;
  background: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-slider-right-134c53f44716c3bef227ec30da385b4b09c9c068d339a617a23093718f379d02.svg) no-repeat;
`;


const Post = () => {
    // 예약하기 버튼 눌렀을 시 캘린더 띄우는 상태
    const [isOpen, setOpen] = useState(false);

    // 게시글 띄우는 상태
    const [post, setPost] = useState(null);

    const { postId } = useParams(); // URL에서 postId 파라미터 추출

    // Image Swapping State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    // 사진 스왑 함수
    const handleNextImage = () => {
        setCurrentImageIndex(prev => (prev + 1) % post.boardImage.length);
    };
    const handlePrevImage = () => {
        setCurrentImageIndex(prev => prev === 0 ? post.boardImage.length - 1 : prev - 1);
    };


    // 예약창 토글
    const toggleReservationOverlay = () => {
        setOpen(!isOpen);
    };




    // 예약 정보 전송 로직
    const handleReservationSubmit = async (reservationData) => {
        console.log(reservationData);
        await postDate(reservationData, postId, setOpen);
    };

    // 백엔드 연결
    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const data = await getPost(); // postId를 사용하여 특정 게시글 데이터 가져오기, postId 제거함
    //         setPost(data);
    //     };
    //     fetchPost();

    // }, []);


    // 더미 데이터 테스트
    useEffect(() => {
        // 더미 데이터 게시글
        const dummyData = [
            {
                id: 1,
                boardTitle: "게시글 제목",
                boardImage: ["/asset/img/logo.png", "/asset/img/testPostImg.png", "/asset/img/testPostImg2.png"],
                boardContents: "게시글 내용",
                boardPrices:"5000원",
                reservationList: "상준 11월 25일"
            },
            {
                id: 2,
                boardTitle: "게시글 제목2",
                boardImage: ["/asset/img/logo.png"],
                boardContents: "게시글 내용2",
                boardPrices:"5,000,000원",
                reservationList: "상준 11월 25임"
            }
        ];
        const fetchPost = () => {
            // postId에 해당하는 게시글 찾기
            const foundPost = dummyData.find(p => p.id === parseInt(postId));
            setPost(foundPost); // 찾은 게시글을 상태로 설정
        };
        fetchPost();
    }, [postId]);
    //


    // 게시글이 null일 때 처리
    if (!post) {
        return <div>Loading...</div>;
    }

    // 이미지가 한 개 이상 있을 때만 버튼 표시
    const shouldShowNavigationButtons = post.boardImage.length > 1;

    return (
        <Container key={post.id}>
            <Contents>
                <ImageContainer>
                    <Img src={post.boardImage[currentImageIndex]} alt="Post" width={"500px"}/>
                    {shouldShowNavigationButtons && (
                        <NavigationButtonDiv>
                            <LeftNavButton onClick={handlePrevImage}> </LeftNavButton>
                            <RightNavButton onClick={handleNextImage}> </RightNavButton>
                        </NavigationButtonDiv>
                    )}
                </ImageContainer>
                <h1>{post.boardTitle}</h1>
                <hr/>
                <p>{post.boardContents}</p>
                <p>{post.boardPrices}</p>

                <div>
                    {/* ... 게시글 내용 ... */}
                    <button onClick={toggleReservationOverlay}>예약하기</button>
                    {isOpen && (
                        <Reservation onSave={handleReservationSubmit} onClose={() => setOpen(false)} />
                    )}
                </div>
            </Contents>
        </Container>
    );


    //TODO:
    // 해당 게시글 유저가 아니면 수정 및 삭제, 예약테이블 상세메시지(보안) 표시 X


};

export default Post;