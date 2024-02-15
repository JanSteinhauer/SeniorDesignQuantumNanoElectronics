import React from 'react';
import styled from 'styled-components';
import SvgIcon from './SvgIcon';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
  background-color: #262556;
  display: flex; // Set Navbar to be a flex container
  height: 80px; // Set a specific height for the Navbar
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
`;

const NavItem = styled(Link)`
  display: flex; // Set NavItem to be a flex container as well
  align-items: center; // Center content (including SVG) vertically
  color: #f2f2f2;
  text-align: center;
  height: 100%; // Set height to 100% to fill the Navbar
  padding: 0px 16px;
  text-decoration: none;
  font-size: 27px; // Set font size to 32px
  // font-weight: ${(props) => (props.primary ? '700' : 'normal')}; // Set font weight conditionally

  &:not(:last-child) {
    margin-right: 30px; // Add spacing between NavItems
  }

  &:hover {
    background-color: #ddd;
    color: black;
  }

  svg {
    width: 24px; // Set explicit width and height for the SVG
    height: 24px;
    margin-top: -15px; // Set top and bottom margin to -15px
    margin-bottom: -15px;
  }
`;

const NavBar = () => {
  return (
    <Navbar>
      <NavItem to="/" primary>
        <SvgIcon/>
      </NavItem>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/documentation">Documentation</NavItem>
      <NavItem to="/script">Script</NavItem>
      <NavItem to="/visualization">Visualization</NavItem>
      <NavItem to="/people">People</NavItem>
      <NavItem to="/blog">Blog</NavItem>
    </Navbar>
  );
};

export default NavBar;
