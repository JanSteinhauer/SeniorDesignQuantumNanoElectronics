// Import necessary dependencies
import React from 'react';
import styled from 'styled-components';

// Styled component for the sidebar
const Sidebar = styled.div`
  background-image: linear-gradient(
    to right, 
    rgba(255, 255, 255, 0.1), 
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(5px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  height: 100vh;
  width: 250px;
  position: absolute;
  top: 80px;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1000;
`;

// Styled component for navigation links
const NavLink = styled.a`
  margin: 10px 0;
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff69b4; // Light pink for hover effect
  }
`;

// NavSidebar component
const NavSidebar = ({ onLinkClick }) => {
    return (
      <Sidebar>
        <NavLink href="#" onClick={() => onLinkClick('Material Determination Tutorial')}>Tutorial</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 2')}>Doc 2</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 3')}>Doc 3</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 4')}>Doc 4</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 5')}>Doc 5</NavLink>
      </Sidebar>
    );
  };
export default NavSidebar;
