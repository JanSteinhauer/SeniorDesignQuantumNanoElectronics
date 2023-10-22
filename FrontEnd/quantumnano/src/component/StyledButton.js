import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #262556;
  color: white;
  padding: 15px 30px;  // Increased padding for a bigger button
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  transition: background-color 0.3s;
  margin-bottom: 25px;  // Added margin-bottom

  &:hover {
    background-color: #1c1c3b;
  }
`;

const Button = ({ heading }) => {
  return <StyledButton>{heading}</StyledButton>;
};

export default Button;
