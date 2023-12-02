import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/useUserStore'; // 실제 위치에 맞게 경로 수정
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";
import {PostComponent} from "../components/PostComponent";

const Wrapper = styled.div`
  padding: 0 20px; /* 양 옆에 20px의 패딩을 적용 */
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 120px auto; /* 중앙 정렬 */
  width: 100%;
`;

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
  width: 100%; /* 최대 너비를 100%로 설정하여 Wrapper의 너비에 맞춥니다. */
  max-width: 1200px; /* 컨텐츠의 최대 너비를 설정합니다. 필요에 따라 조정 가능합니다. */
  margin: 0 auto; /* 중앙 정렬을 위해 자동 마진을 사용합니다. */
`;

const MyPage = () => {
    const [posts, setPosts] = useState([]); // 여러 데이터를 저장할 상태
    const {userId} = useUserStore(); // Zustand를 통해 유저 ID를 가져옵니다.

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
    }, []); // 최초 렌더링 시에만 실행되도록 빈 배열 전달

    return (

        <Wrapper>
            <PostWrapper>
                {posts.map(post => (
                    <PostComponent key={post.boardIndex} {...post} />
                ))}
            </PostWrapper>
        </Wrapper>

    );
};


export default MyPage;
