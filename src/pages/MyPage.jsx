import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore'; // 실제 위치에 맞게 경로 수정
import styled from "@emotion/styled";
import {MyPostComponent} from '../components/MyPostComponent'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  margin-top: 150px;
  width: 100%;
`;
const Hello = styled.label`
  font-size: 35px;
  letter-spacing: 1px;
  //margin-left: 15px;
  margin-bottom: 50px;
  grid-column: 2/3;
  background-color: pink;
  border-radius: 10px;
  padding: 10px;
  
`;

const PostWrapper = styled.div`
  grid-column: 2/3;
  max-width: 1200px; /* 컨텐츠의 최대 너비를 설정합니다. 필요에 따라 조정 가능합니다. */
`;

const NothingLabel = styled.label`
  position: absolute;
  font-size: 20px;
  transform: translateX(360%);
  margin-top: 200px;
`;

const MyPage = () => {
    const [posts, setPosts] = useState([]); // 여러 데이터를 저장할 상태
    const userId = useUserStore(state => state.userId);

    useEffect(() => {
        // 더미 데이터를 posts 상태로 설정합니다.
        const data = [
            {
                memberEmail: "wns2349@naver.co",
                boardIndex: 1,
                boardTitle: "post 1",
                boardPrice: "1000",
                boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScY1JCmDBElwyYIfoEUdJSms3eIZqG8b7-Ig&usqp=CAU"
            }, {
                memberEmail: "wns2349@na",
                boardIndex: 2,
                boardTitle: "post 2",
                boardPrice: "10000",
                boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
            },
            // 나머지 더미 데이터들...
        ];
        setPosts(data);

        //백엔드 연결
        // const fetchPosts = async () => {
        //     try {
        //         const data = await getMyPostList(userId);
        //         setPosts(data);
        //     } catch (error) {
        //         console.error('게시글 불러오기 실패:', error);
        //     }
        // };
        // fetchPosts();

    }, []); // 최초 렌더링 시에만 실행되도록 빈 배열 전달



    return (

        <Wrapper>
            <Hello>[{userId}]님의 물건들이에요!</Hello>
            <PostWrapper>
                {posts !== undefined ? (
                    posts.map(post => (
                        <MyPostComponent key={post.boardIndex} {...post} />
                    ))
                ) : (
                    <NothingLabel>저의 게시물이 없습니다.</NothingLabel>
                )}
            </PostWrapper>
        </Wrapper>

    );
};


export default MyPage;
