import React, { useState, useEffect } from 'react';
import { getPostList } from '../apis/getDataApi';
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

const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {


        // 더미 데이터
        // const data = [
        //         {
        //             memberEmail: "wns2349@naver.co",
        //             boardIndex: 1,
        //             boardTitle: "post 1",
        //             boardPrice: "1000",
        //             boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScY1JCmDBElwyYIfoEUdJSms3eIZqG8b7-Ig&usqp=CAU"
        //     },{
        //         memberEmail: "wns2349@na",
        //         boardIndex: 2,
        //         boardTitle: "post 2",
        //         boardPrice: "10000",
        //         boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
        //     },
        //     {
        //         memberEmail: "wns2349@na",
        //         boardIndex: 3,
        //         boardTitle: "post 3",
        //         boardPrice: "100",
        //         boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
        //     },
        //     {
        //         memberEmail: "wns2349@na",
        //         boardIndex: 4,
        //         boardTitle: "post 4",
        //         boardPrice: "1000000",
        //         boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
        //     },
        //     {
        //         memberEmail: "wns2349@na",
        //         boardIndex: 5,
        //         boardTitle: "post 5",
        //         boardPrice: "100000000",
        //         boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
        //     }
        // ];
        // setPosts(data);

        //백엔드 연결
        const fetchPosts = async () => {
            try {
                const data = await getPostList();
                setPosts(data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };
        fetchPosts();
    }, []);

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

export default Main;
