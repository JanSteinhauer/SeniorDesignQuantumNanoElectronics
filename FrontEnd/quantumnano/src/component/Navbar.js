import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  overflow: hidden;
`;

const NavItem = styled.a`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

const NavBar = () => {
  return (
    <Navbar>
      <NavItem href="#home">
      </NavItem>
      <NavItem href="#home">Home</NavItem>
      <NavItem href="#support">Support</NavItem>
      <NavItem href="#visualization">Visualization</NavItem>
      <NavItem href="#people">People</NavItem>
      <NavItem href="#blog">Blog</NavItem>
    </Navbar>
  );
};

export default NavBar;
