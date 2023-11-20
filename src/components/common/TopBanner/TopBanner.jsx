// 스크롤 업하면 상단에 유지, 스크롤 다운하면 사라지기, 페이지 맨 위에서는 원래 자리
import LogoImg from "./section/LogoImg";
import LoginAndOut from "./section/LoginAndOut";
export const TopBanner = ({children}) => {

    // css

    return (
        <>
            <LogoImg />
            <LoginAndOut />
            {children}
        </>
    );
};
// export default TopBanner;
