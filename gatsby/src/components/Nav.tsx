import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const StyledNav = styled.nav`
  ul {
    list-style: none;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    margin-top: -6rem;
    margin-bottom: 0;
  }
  .logo {
    transform: translateY(-25%);
  }
  li {
    --rotate: 0;
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:nth-child(5) {
      --rotate: -2deg;
    }
    &:hover {
      --rotate: 3deg;
      a {
        color: var(--red);
      }
    }
  }
  a {
    transform: rotate(var(--rotate));
    font-size: 3rem;
    text-decoration: none;
    display: block;
  }
`;

const Nav: React.FC = () => (
  <StyledNav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/pizzas'>Pizza Menu</Link>
      </li>
      <li>
        <Link to='/'>
          <Logo />
        </Link>
      </li>
      <li>
        <Link to='/slicemasters'>Slicemasters</Link>
      </li>
      <li>
        <Link to='/order'>Order Ahead</Link>
      </li>
    </ul>
  </StyledNav>
);

export default Nav;
