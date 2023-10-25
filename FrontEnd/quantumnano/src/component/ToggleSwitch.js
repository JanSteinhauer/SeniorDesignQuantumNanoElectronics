import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SwitchButton = styled.div`
  width: 50px;
  height: 30px;
  background-color: ${({ isToggled }) => (isToggled ? "#4CAF50" : "#f2f2f2")};
  border-radius: 25px;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SwitchCircle = styled.div`
  width: 28px;
  height: 28px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: ${({ isToggled }) => (isToggled ? "calc(100% - 29px)" : "1px")};
  transition: left 0.3s ease;
`;

const LabelText = styled.span`
  font-size: 16px;
`;

const ToggleSwitch = ({ onSwitch }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
    onSwitch(!isToggled);
  };

  return (
    <SwitchContainer onClick={handleClick}>
      <SwitchButton isToggled={isToggled}>
        <SwitchCircle isToggled={isToggled} />
      </SwitchButton>
      <LabelText>{isToggled ? 'Advanced on' : 'Advanced off'}</LabelText>
    </SwitchContainer>
  );
};

export default ToggleSwitch;
