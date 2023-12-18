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
const NothingLabel = styled.label`
  position: absolute;
  font-size: 20px;
  transform: translateX(360%);
  margin-top: 200px;
`;


const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {


        // 더미 데이터
        const data = [
                {
                    memberEmail: "wns2349@naver.com",
                    boardIndex: 1,
                    boardTitle: "미니벨로 클래식 자전거",
                    boardPrice: "7,000",
                    boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202311/615974e707e6bf1df84529c58bb256429e59a69f7558497593db3a924284c08d.jpg?q=95&s=1440x1440&t=inside&f=webp"
            },{
                memberEmail: "wns2349@na",
                boardIndex: 2,
                boardTitle: "베이스",
                boardPrice: "3,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/e4f27a717a568fa116b4a9f5609161ca8f6ca73811e633e978a2677a6dc9f168.jpg?q=95&s=1440x1440&t=inside&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 3,
                boardTitle: "승용차",
                boardPrice: "30,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202311/bb57b8c3200bf77b5ad4e12f1e78239e5c7e6706461bd6154d0701390ac5ac22_1.webp?q=95&s=1440x1440&t=inside&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 4,
                boardTitle: "post 4",
                boardPrice: "1000000",
                boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 5,
                boardTitle: "post 5",
                boardPrice: "100000000",
                boardFileIndex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxMMOlhiqWEJVNcSFzBpSfeYt2VQKeBImzg&usqp=CAU"
            }
        ];
        setPosts(data);

        //백엔드 연결
        // const fetchPosts = async () => {
        //     try {
        //         const data = await getPostList();
        //         setPosts(data);
        //     } catch (error) {
        //         console.error('게시글 불러오기 실패:', error);
        //     }
        // };
        // fetchPosts();
    }, []);

    return (

        <Wrapper>
            <PostWrapper>
                {posts !== undefined ? (
                    posts.map(post => (
                        <PostComponent key={post.boardIndex} {...post} />
                    ))
                ) : (
                    <NothingLabel>게시물이 없습니다.</NothingLabel>
                )}
            </PostWrapper>
        </Wrapper>

    );
};

export default Main;
