/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {Header} from "./Header";
import {Footer} from "./Footer";

const Main = styled.main`
  height: auto;
  min-height: 100vh;
  padding-bottom: 500px;
`;

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </>

    );
};

export default Layout;
