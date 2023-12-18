import React, { useState, useEffect } from 'react';
import { getPostList } from '../apis/getDataApi';
import styled from "@emotion/styled";
import {PostComponent} from "../components/PostComponent";
import {useTestStore} from "../store/useTestStore";


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
                memberEmail: "wns2349@naver.com",
                boardIndex: 3,
                boardTitle: "승용차",
                boardPrice: "30,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202311/bb57b8c3200bf77b5ad4e12f1e78239e5c7e6706461bd6154d0701390ac5ac22_1.webp?q=95&s=1440x1440&t=inside&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 4,
                boardTitle: "고급 골프채",
                boardPrice: "20,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/c951e09031254f04e9433523c0694c558c67200d853f3d3dc0a007a9e76dff19_0.webp?q=82&s=300x300&t=crop&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 5,
                boardTitle: "축구화",
                boardPrice: "10,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/ba85203313adde16f43bb33c794382efb1809665890e5b0923010145cd8af62b.jpg?q=95&s=1440x1440&t=inside&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 6,
                boardTitle: "구찌 가방",
                boardPrice: "70,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202311/eb1389e16037bae26290f53efb2d30d0621517fa8c4a779db23b8d8d6d2fb1bf_0.webp?q=82&s=300x300&t=crop&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 7,
                boardTitle: "충전기",
                boardPrice: "1,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/c7ef2e7f3d88c0c3ab6ae901981c56ac51e8c8d765e5132cd1b0d8994f7be6ff.jpg?q=82&s=300x300&t=crop&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 8,
                boardTitle: "스노우 보드",
                boardPrice: "20,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/57a0f2cdaa82f6a35a84105c4df9242d726fabf493efe77943b66b2f9529264a_0.webp?q=82&s=300x300&t=crop&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 9,
                boardTitle: "에어팟 맥스",
                boardPrice: "20,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202311/876d1b0f83cf4c6fc7e0f914a159e673056e83187c8894696e543718f11cf7bb.jpg?q=82&s=300x300&t=crop&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 10,
                boardTitle: "전자레인지",
                boardPrice: "3,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/c12926e27a1d0ce1aef34d79a1399fc4f89a784b7dd10017fcf7a556d81c20ff.jpg?q=82&s=300x300&t=crop&f=webp"
            },
            {
                memberEmail: "wns2349@na",
                boardIndex: 11,
                boardTitle: "구두",
                boardPrice: "10,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/dbebe8cc0931e3ddd92658c2982fcd4c94ff29ef6f7139b895baffa2f7b332de_0.webp?q=82&s=300x300&t=crop&f=webp"
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



    const testData = useTestStore(state => state);

    return (

        <Wrapper>
            <PostWrapper>
                {posts !== undefined ? (
                    posts.map((post) => (
                        <PostComponent
                            key={post.boardIndex}
                            boardIndex={post.boardIndex}
                            boardTitle={post.boardTitle}
                            boardPrice={post.boardPrice}
                            boardFileIndex={post.boardFileIndex}
                        />
                    ))
                ) : (
                    <NothingLabel>게시물이 없습니다.</NothingLabel>
                )}
                {testData.boardIndex !== 0 ? (
                    <PostComponent
                        key={testData.boardIndex}
                        boardIndex={testData.boardIndex}
                        boardTitle={testData.boardTitle}
                        boardPrice={testData.boardPrice}
                        boardFileIndex={testData.boardFileIndex}
                    />
                ) : null}
            </PostWrapper>
        </Wrapper>


    );
};

export default Main;
