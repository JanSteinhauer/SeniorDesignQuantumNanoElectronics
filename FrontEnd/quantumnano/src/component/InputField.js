import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Make sure this import is added


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

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const InputField = ({ labelText, inputPlaceholder, helpText, showAsterisk, onValueChange, min, max }) => {
  const [value, setValue] = useState("");
  const [showHelp, setShowHelp] = useState(false); // Define the showHelp state

  const debouncedValidation = useCallback(debounce((newValue) => {
    // Check if newValue is a number
    if (isNaN(newValue)) {
      alert('Please enter a valid number');
      setValue('');
      return;
    }

    // Check the bounds
    if (newValue < min || newValue > max) {
      alert(`Value must be between ${min} and ${max}`);
      setValue('');
      return;
    }

    setValue(newValue);
    onValueChange && onValueChange(newValue);
  }, 350), []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // Update the value immediately for a responsive UI
    debouncedValidation(newValue); // Validate with a delay
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
};

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  helpText: PropTypes.string,
  showAsterisk: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default InputField;
