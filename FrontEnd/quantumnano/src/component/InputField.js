import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 5px;
  position: relative;
  background-color: transparent;
  justify-content: flex-start;
`;

const InfoIcon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const Asterisk = styled.span`
  color: red;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #666;
  display: ${props => props.show ? 'block' : 'none'};
`;

const InputField = ({ labelText, inputPlaceholder, helpText, showAsterisk, onValueChange }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [value, setValue] = useState("");  // New state to store the input value

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onValueChange && onValueChange(e.target.value);  // Sending value to parent
  }
  return (
    <Container>
      <Label>
        {labelText} {showAsterisk && <Asterisk> *</Asterisk>}
        <InfoIcon onClick={() => setShowHelp(!showHelp)}>i</InfoIcon>
      </Label>
      <Input 
      type="text" 
      placeholder={inputPlaceholder} 
      value={value} 
      onChange={handleInputChange} 
    />
      <HelpText show={showHelp}>
        {helpText}
      </HelpText>
    </Container>
  );
}

export default InputField;
