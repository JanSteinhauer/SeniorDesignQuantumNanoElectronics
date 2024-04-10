// Import necessary dependencies
import React from 'react';
import styled from 'styled-components';

// Styled component for the sidebar
const Sidebar = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
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
  box-shadow: rgba(255, 255, 255, 0.5) -20px -20px 45px inset,
    rgba(0, 0, 0, 0.1) 10px 10px 20px, rgba(0, 0, 0, 0.06) 5px 5px 10px;
`;

// Styled component for navigation links
const NavLink = styled.a`
  margin: 10px 0;

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
        <NavLink href="#" onClick={() => onLinkClick('Material Determination Tutorial')}>Geometry</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 2')}>Functions</NavLink>
        {/* <NavLink href="#" onClick={() => onLinkClick('Doc 3')}>Doc 3</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 4')}>Doc 4</NavLink>
        <NavLink href="#" onClick={() => onLinkClick('Doc 5')}>Doc 5</NavLink> */}
      </Sidebar>
    );
  };
export default NavSidebar;
