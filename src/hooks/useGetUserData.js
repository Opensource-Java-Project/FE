import {useEffect} from "react";
import {getUserData} from "../apis/getDataApi";
import useLoggedInStore from "../store/useLoggedInStore";

const useGetUserData = () => {
    const setUserData = useLoggedInStore((state) => state.setLoggedIn);

    useEffect(() => {
        getUserData().then(data => {
            setUserData(data);
        });
    }, [setUserData]);
};

export default useGetUserData;