import {useNavigate} from "react-router-dom";
// import useUserDataStore from "../../../../store/useUserDataStore";
import styled from "@emotion/styled";

const ProfileImage = styled.img`
  width: 50px;
  height: auto;
  //padding-right: 10px;
`

const ProfileImg = () => {
    const navigate = useNavigate();
    // const user = useUserDataStore();
    // dummy data
    const user = {
        id:1
    }


    return (
        <>
            <ProfileImage
                src={"/asset/img/profileImage.png"}
                alt={"user_profile"}
                onClick={()=> navigate(`/mypage/${user.id}`)} />
        </>
    );
}

export default ProfileImg;