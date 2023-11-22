import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import Main from "./pages/Main";
import { TopBanner } from "./components/common/TopBanner";


const router = createBrowserRouter([
    { path: '/', element: <><TopBanner /><Main /></>},
    { path: '/register', element: <Register/> },
    { path: '/login', element: <Login />},
    { path: '/post/:postId', element: <><TopBanner /><Post /></>},
    { path: '/mypage/:userId', element: <><TopBanner /><MyPage /></>}
]);

const App = () => {

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
