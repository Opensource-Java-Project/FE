import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import Main from "./pages/Main";
import { TopBanner } from "./components/common/TopBanner";
// import useGetUserData from "./hooks/useGetUserData";


const router = createBrowserRouter([
    { path: '/', element: <TopBanner><Main /></TopBanner>},
    { path: '/register', element: <TopBanner><Register /></TopBanner> },
    { path: '/login', element: <TopBanner><Login /></TopBanner> },
    { path: '/post/:postId', element: <TopBanner><Post /></TopBanner>},
    { path: '/mypage/:userId', element: <TopBanner><MyPage /></TopBanner>}
]);

const App = () => {
    // useGetUserData(); //사용자 데이터 가져오는 커스텀 훅, 아마 백엔드에서 UUID로 쿠키 저장해주고 로그인 여부 확인

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
