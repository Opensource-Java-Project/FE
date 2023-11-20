// Post
import React, {useEffect, useState} from "react";
import {getPost} from "../apis/getDataApi";
import {postDate} from "../apis/postDataApi";
import {useParams} from "react-router-dom";
import {Reservation} from "../components/Reservation/Reservation";


const Post = () => {
    // 예약하기 버튼 눌렀을 시 캘린더 띄우는 상태
    const [isOpen, setOpen] = useState(false);

    // 게시글 띄우는 상태
    const [post, setPost] = useState(null);

    const { postId } = useParams(); // URL에서 postId 파라미터 추출


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
    //         const data = await getPost(postId); // postId를 사용하여 특정 게시글 데이터 가져오기
    //         setPost(data);
    //     };
    //     fetchPost();

    // }, [postId]);




    // 더미 데이터 테스트
    useEffect(() => {
        // 더미 데이터 게시글
        const dummyData = [
            {
                id: 1,
                boardTitle: "게시글 제목",
                boardImage: "image-url.jpg",
                boardContents: "게시글 내용",
                reservationList: "상준 11월 25일"
            },
            {
                id: 2,
                boardTitle: "게시글 제목2",
                boardImage: "image-url2.jpg",
                boardContents: "게시글 내용2",
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



    return (
        <div key={post.id}>
            <h3>{post.boardTitle}</h3>
            <img src={post.boardImage} alt={post.boardTitle} />
            <p>{post.boardContents}</p>

            <div>
                {/* ... 게시글 내용 ... */}
                <button onClick={toggleReservationOverlay}>예약하기</button>
                {isOpen && (
                    <Reservation onSave={handleReservationSubmit} onClose={() => setOpen(false)} />
                )}
            </div>
        </div>
    );

    // 해당 게시글 유저가 아니면 수정 및 삭제, 예약테이블 상세메시지(보안) 표시 X

    // 예약하기 버튼 / 해당 사용자에게 알림(?)

};

export default Post;