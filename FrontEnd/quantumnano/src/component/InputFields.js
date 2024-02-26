import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import DropDown from './DropDown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const InputFields = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  // Initialize inputValues state with an array of empty strings or default values
  const [inputValues, setInputValues] = useState(Array(6).fill('')); // Assuming 6 input fields

  const handleValueChange = (index, value) => {
    // Update the specific value based on the index
    const updatedValues = inputValues.map((val, i) => i === index ? value : val);
    setInputValues(updatedValues);
  };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  const setValuesBasedOnOption = () => {
    // Logic to set values based on the selectedOption
    console.log('Setting values based on option:', selectedOption);
    switch (selectedOption?.value) {
      case 'defaults':
        // setInputValues(Array(6).fill(0)); // Set all input values to 0 for "Defaults"
        break;
      case 'presetOne':
        // Set values for "Preset One"
        const presetValues = [1, 23, 22, 44, 5, 90];
        setInputValues(presetValues);
        break;
      case 'presetTwo':
        const presetValues2 = [3, 3, 32, 55, 42, 60];
        setInputValues(presetValues2);
        break;
      // Add more cases as needed
      default:
        setInputValues(Array(6).fill('')); // Reset or clear values
        break;
    }
  };

  useEffect(() => {
    setValuesBasedOnOption();
  }, [selectedOption]);

  return (
    <Container>
      <DropDown
        options={[
          { value: 'defaults', label: 'Defaults' },
          { value: 'presetOne', label: 'Preset One' },
          { value: 'presetTwo', label: 'Preset Two' },
          // Add more options as needed
        ]}
        selectedOption={selectedOption}
        onSelect={handleDropdownSelect}
      />
      {inputValues.map((value, index) => (
        <InputField
          key={index}
          labelText={`Field ${index + 1}`}
          inputPlaceholder={`Field ${index + 1} Value`}
          helpText={`Help text for Field ${index + 1}`}
          showAsterisk={true}
          value={value} // Pass the current value to each InputField
          onValueChange={(newValue) => handleValueChange(index, newValue)}
          min={0}
          max={100}
        />
      ))}
    </Container>
  );
};

export default InputFields;
