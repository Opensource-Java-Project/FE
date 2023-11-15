import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import { TopBanner } from "./components/common/TopBanner";
import useGetUserData from "./hooks/useGetUserData";


const router = createBrowserRouter([
    { path: '/register', element: <TopBanner><Register /></TopBanner> },
    { path: '/login', element: <TopBanner><Login /></TopBanner> },
    { path: '/post', element: <TopBanner><Post /></TopBanner>},
    { path: '/mypage/:userId', element: <TopBanner><MyPage /></TopBanner>}
]);

const App = () => {
    useGetUserData(); //사용자 데이터 가져오는 커스텀 훅

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
