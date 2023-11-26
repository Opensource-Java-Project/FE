import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import Main from "./pages/Main";
// import { Header } from "./components/common/Header";
// import {Footer} from "./components/common/Footer";
import Layout from "./components/common/Layout";
import { Global, css } from '@emotion/react';


const router = createBrowserRouter([
    { path: '/', element: <><Layout ><Main /></ Layout> </>},
    { path: '/register', element: <Register/> },
    { path: '/login', element: <Login />},
    { path: '/post/:postId', element: <><Layout><Post /></ Layout></>},
    { path: '/mypage/:userId', element: <><Layout><MyPage /></Layout></>}
]);

// font
const globalStyles = css`
  body, button {
    font-family: 'Jua', sans-serif;
  }
`;

const App = () => {

    return (
        <>
            <Global styles={globalStyles} />
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
