// 로고 이미지(클릭 가능), 로그인 || 로그아웃, 프로필(클릭 시 마이페이지)
import LogoImg from "./section/LogoImg";
import LoginAndOut from "./section/LoginAndOut";
import ProfileImg from "./section/ProfileImg";
const TopBanner = ({children}) => {

    // css

    return (
        <>
            <LogoImg />
            <LoginAndOut />
            <ProfileImg />
            {children}
        </>
    );
};
export default TopBanner;
