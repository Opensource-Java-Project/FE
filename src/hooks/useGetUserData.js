import {useEffect} from "react";
import useUserDataStore from "../store/useUserDataStore";
import {getUserData} from "../apis/getDataApi";

const useGetUserData = () => {
    const setUser = useUserDataStore((state) => state.setUser);

    useEffect(() => {
        getUserData().then(data => {
            setUser(data);
        });
    }, [setUser]);
};

export default useGetUserData;