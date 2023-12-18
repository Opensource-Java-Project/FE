// Post
import React, {useEffect, useState} from "react";
import {getPost} from "../apis/getDataApi";
import {postDate} from "../apis/postDataApi";
import {useParams} from "react-router-dom";
import {Reservation} from "../components/Reservation/Reservation";
import styled from "@emotion/styled";
import {useUserStore} from "../store/useUserStore";


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 110px 1fr ;
  height: 100vh;
  width: 100vw;
  //overflow-y: auto;
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

const ContentP = styled.p `
  margin-top: 30px;
  margin-bottom: 50px;
`;

const PricesLabel = styled.label`
  background-color: #efefef;
  border-radius: 15px;
  padding: 10px 10px;
  box-shadow: inset 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
`;

const ReservationDiv = styled.div`
  text-align: center;
  margin-top: 50px;
  border-style: solid;
  border-color: #8c8c8c;
  border-radius: 10px;
  border-width: 2px;
  padding: 12px;
`;

// 테이블 스타일 정의
const StyledTable = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
`;

// 테이블 셀 스타일 정의
const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

// 테이블 행 스타일 정의
const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;
const ReservationButton = styled.button`
  margin-top: 30px;
  padding: 6px 10px;
  letter-spacing: 1px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  display: block;
  color: white;
  background-color: #ff97a8;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  &:active{
    box-shadow: none;
    transition: background-color 0.2s ease-out;
  }
`;


const Post = () => {
    // 예약하기 버튼 눌렀을 시 캘린더 띄우는 상태
    const [isOpen, setOpen] = useState(false);

    // 게시글 띄우는 상태
    const [post, setPost] = useState(null);

    const { postId } = useParams(); // URL에서 postId 파라미터 추출
    // Image Swapping State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 사용자 인증 상태
    const postAuth = useUserStore(state => state.userId);

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
        console.log("reservationData", reservationData);
        await postDate(reservationData, postId, setOpen);
        //TODO: 예약 성공시 성공 메시지

    };


    // 백엔드 연결
    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const data = await getPost(postId); // postId를 사용하여 특정 게시글 데이터 가져오기
    //         setPost(data);
    //
    //
    //     };
    //     fetchPost();
    //
    // }, [postId]);



    // 더미 데이터 테스트
    useEffect(() => {
        // 더미 데이터 게시글
        const dummyData = [
            {
                memberEmail: "wns2349@naver.com",
                boardIndex: 1,
                boardTitle: "미니벨로 클래식 자전거",
                boardImage: ["https://dnvefa72aowie.cloudfront.net/origin/article/202311/615974e707e6bf1df84529c58bb256429e59a69f7558497593db3a924284c08d.jpg?q=95&s=1440x1440&t=inside&f=webp", "https://dnvefa72aowie.cloudfront.net/origin/article/202311/c5ca198d2980594112019af452d1ade945b9c9e0f0c15d399eb74131ec9f93bb.jpg?q=95&s=1440x1440&t=inside&f=webp", "https://dnvefa72aowie.cloudfront.net/origin/article/202311/764afbfa3c523cd095bf73db4a48f91b6bd7339f102d9a438806ba3cc578ef00.jpg?q=95&s=1440x1440&t=inside&f=webp"],
                boardContents: "상태 좋아요. 자전거 빌려드립니다.",
                boardPrice:"7,000",
                reservationList: [{ start: '2023-12-25', end:'2023-12-28', content:"13시 충북대 정문에서 만나요" }, { start: '2023-12-30', end:'2023-12-30', content:"15시 추포" },] // 받아올 때 유저인증을 미리 하고 받아오는 데이터를 다르게 해야 보안상 문제가 안생길 듯
            },
            {
                memberEmail: "wns1234@naver.c",
                boardIndex: 2,
                boardTitle: "베이스",
                boardImage: ["https://dnvefa72aowie.cloudfront.net/origin/article/202312/e4f27a717a568fa116b4a9f5609161ca8f6ca73811e633e978a2677a6dc9f168.jpg?q=95&s=1440x1440&t=inside&f=webp"],
                boardContents: "조율 잘 되어 있어요.",
                boardPrice:"3,000",
                reservationList: [{ start: '2024-01-02', end:'2024-01-09', content:"중문에서 14시에 갈게요" }]
            },
            {
                memberEmail: "wns1234@naver.com",
                boardIndex: 3,
                boardTitle: "승용차",
                boardImage: ["https://dnvefa72aowie.cloudfront.net/origin/article/202311/bb57b8c3200bf77b5ad4e12f1e78239e5c7e6706461bd6154d0701390ac5ac22_1.webp?q=95&s=1440x1440&t=inside&f=webp"],
                boardContents: "기름은 반납 시 채워주세요. 개인 부담입니다.",
                boardPrice:"30,000",
                reservationList: [{ start: '2024-01-02', end:'2024-01-09', content:"중문에서 14시에 갈게요" }]
            }
        ];
        const fetchPost = () => {

            // postId에 해당하는 게시글 찾기
            const foundPost = dummyData.find(p => p.boardIndex === parseInt(postId));
            setPost(foundPost); // 찾은 게시글을 상태로 설정

        };
        fetchPost();
    }, []);




    // 게시글이 null일 때 처리
    if (!post) {
        return <div>Loading...</div>;
    }

    // 이미지가 한 개 이상 있을 때만 버튼 표시
    const shouldShowNavigationButtons = post.boardImage.length > 1;


    // 사용자 인증 상태 확인 후 맞다면 상세메시지 표시
    const isPostAuth = postAuth === post.memberEmail;



    // 예약 테이블
    const ReservationTable = ({ reservations, isPostAuth }) => {
        return (
            <StyledTable>
                <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {isPostAuth && <th>Content</th>}
                </tr>
                </thead>
                <tbody>
                {reservations.map((reservation, index) => (
                    <TableRow key={index}>
                        <TableCell>{reservation.start}</TableCell>
                        <TableCell>{reservation.end}</TableCell>
                        {isPostAuth && <TableCell>{reservation.content}</TableCell>}
                    </TableRow>
                ))}
                </tbody>
            </StyledTable>
        );
    };


    return (
        <Container key={post.boardIndex}>
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
                <ContentP>{post.boardContents}</ContentP>
                <PricesLabel>{post.boardPrice}</PricesLabel>
                <ReservationDiv>
                    <label>예약 현황</label>
                    <hr/>
                    <ReservationTable reservations={post.reservationList} isPostAuth={isPostAuth}  />
                </ReservationDiv>

                <div>

                </div>

                <div>
                    <ReservationButton onClick={toggleReservationOverlay}>예약하기</ReservationButton>
                    {isOpen && (
                        <Reservation onSave={handleReservationSubmit} onClose={() => setOpen(false)} reservations = {post.reservationList}/>
                    )}
                </div>
            </Contents>
        </Container>
    );




};

export default Post;