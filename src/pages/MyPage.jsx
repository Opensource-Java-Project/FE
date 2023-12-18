import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore'; // 실제 위치에 맞게 경로 수정
import styled from "@emotion/styled";
import { MyPostComponent } from '../components/MyPostComponent';
import { useSpring, animated } from '@react-spring/web';

const ProfileWrapper = styled.div`
  display: flex; /* 세로 정렬을 위해 flex로 변경 */
  flex-direction: column; /* 아이템을 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
  margin-top: 150px;
  //margin-bottom: 400px;
  margin-left: 25vw;
  width: 700px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 70px 30px 150px 30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
`;


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  margin-top: 150px;
  width: 100%;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
`;

const Hello = styled(animated.label)`
  font-size: 15px;
  letter-spacing: 1px;
  //margin-bottom: 50px;
  margin-top: 1px;
  padding: 10px;
  width: 170px;
`;

const PostWrapper = styled.div`
  grid-column: 2/3;
  max-width: 1200px;
`;

const NothingLabel = styled.label`
  position: absolute;
  font-size: 20px;
  transform: translateX(360%);
  margin-top: 200px;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; /* ProfileImg와 Hello를 그리드로 배치 */
  grid-column-gap: 10px; /* 간격 조정 */
  align-items: center; /* 세로 정렬 */
  margin-bottom: 60px;
`;

const MyPage = () => {
    const [posts, setPosts] = useState([]);
    const userId = useUserStore(state => state.userId);
    const props = useSpring({ opacity: 1, from: { opacity: 0 } });

    useEffect(() => {
        const data = [
            {
                memberEmail: "wns2349@naver.co",
                boardIndex: 1,
                boardTitle: "고데기",
                boardPrice: "300",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202312/a4e7bab26e31403d2ee5af65a12e8c5edc41367a7cc3a8e0bd09357f7e5c5577.jpg?q=95&s=1440x1440&t=inside&f=webp"
            }, {
                memberEmail: "wns2349@na",
                boardIndex: 3,
                boardTitle: "승용차",
                boardPrice: "30,000",
                boardFileIndex: "https://dnvefa72aowie.cloudfront.net/origin/article/202311/bb57b8c3200bf77b5ad4e12f1e78239e5c7e6706461bd6154d0701390ac5ac22_1.webp?q=95&s=1440x1440&t=inside&f=webp"
            },
            // 나머지 더미 데이터들...
        ];
        setPosts(data);
    }, []);

    return (
        <Wrapper>
            <ProfileWrapper>
                <ProfileContent>
                    <ProfileImg src={'/asset/img/profileImage.png'}/>
                    <Hello style={props}>{userId}님의 게시물</Hello>
                </ProfileContent>
                <PostWrapper>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <MyPostComponent key={post.boardIndex} {...post} />
                        ))
                    ) : (
                        <NothingLabel>저의 게시물이 없습니다.</NothingLabel>
                    )}
                </PostWrapper>
            </ProfileWrapper>
        </Wrapper>
    );
};

export default MyPage;
