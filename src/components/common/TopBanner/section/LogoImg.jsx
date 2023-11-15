import {useNavigate} from "react-router-dom";

const LogoImg = () => {
    const navigate = useNavigate();

    return (
        <>
            <img src={"asset/img/logo.png"} alt={"logoImg"} onClick={() => navigate('/main')}/>
        </>
    );
};
export default LogoImg;