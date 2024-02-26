import React, { useState, useCallback, useEffect } from 'react';
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

const InputField = ({ labelText, inputPlaceholder, helpText, showAsterisk, onValueChange, min, max, value }) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    // This effect updates the internal state whenever the value prop changes
    setInputValue(value);
  }, [value]);

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

  const debouncedValidation = useCallback(
    debounce((newValue) => {
      // Validations...
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        setInputValue(newValue);
        onValueChange && onValueChange(newValue);
      } else {
        setInputValue('');
        onValueChange && onValueChange('');
      }
    }, 350),
    [min, max, onValueChange]
  );

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    debouncedValidation(newValue);
  };

  return (
    <Container>
      <Label>
        {labelText} {showAsterisk && <Asterisk>*</Asterisk>}
        <InfoIcon>i</InfoIcon>
      </Label>
      <Input
        type="text"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <HelpText show={!!helpText}>{helpText}</HelpText>
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
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Ensure value can be a string or number
};


export default InputField;