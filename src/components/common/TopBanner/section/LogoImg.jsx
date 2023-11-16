import {Link} from "react-router-dom";

const LogoImg = () => {
    return (
        <Link to="/">
            <img src={"asset/img/logo.png"} alt={"logoImg"} />
        </Link>
    );
};
export default LogoImg;