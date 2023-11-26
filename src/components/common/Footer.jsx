/** @jsxImportSource @emotion/react */
// JSX 프로그래머블

import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  background-color: #282c34;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
  
  .footer-content {
    max-width: 1200px;
    margin: auto;
  }

  .footer-links {
    list-style: none;
    padding: 0;

    li {
      display: inline;
      margin: 0 10px;
    }

    a {
      color: white;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Footer = () => {


    return (
        <StyledFooter>
            <div className="footer-content">
                <p>© 2023 My Website. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="https://github.com/Opensource-Java-Project/FE">Front End</a></li>
                    <li><a href="https://github.com/Opensource-Java-Project/BE">Back End</a></li>
                </ul>
            </div>
        </StyledFooter>
    );
};