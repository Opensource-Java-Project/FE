// LoginAndOut.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";
import ProfileImg from "./ProfileImg";
import useLoggedInStore from "../../../../store/useLoggedInStore";




const LoginAndOut = () => {
    const { logout } = useAuth();
    const isLoggedIn = useLoggedInStore(state => state.isLoggedIn);

    const handleLogout = async () => {
        await logout(); // 로그아웃 함수 호출
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <p onClick={handleLogout}>LogOut</p>
                    <ProfileImg/>
                </>

            ) : (
                <Link to={'/login'}>
                    <p>Login</p>
                </Link>
            )}
        </>
    );
};

export default LoginAndOut;
