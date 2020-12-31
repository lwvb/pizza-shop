import React from 'react';
import 'normalize.css';
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const StyledLayout = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 1500px;
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px #0000000b;
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  .content {
    background: white;
    padding: 2rem;
  }
`;

const Layout: React.FC = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <StyledLayout>
      <div className='content'>
        <Nav />
        {children}
        <Footer />
      </div>
    </StyledLayout>
  </>
);

export default Layout;
