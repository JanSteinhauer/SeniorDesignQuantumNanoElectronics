import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import DropDown from './DropDown';


const Container = styled.div`
  // width: 300px;
  // margin: 0 auto;
  // padding: 20px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;




const InputFields = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleValueChange = (field, value) => {
    console.log(`Field: ${field}, Value: ${value}`);
    // You can perform any other actions with the value, e.g., update state
  };


 
  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };


  const setValuesBasedOnOption = () => {
    // Implement logic to set values based on the selectedOption
    console.log('Setting values based on option:', selectedOption);
    switch (selectedOption?.value) {
      case 'Defaults':
        // Set all input values to 0
        for (let i = 1; i <= 6; i++) {
          handleValueChange(`Field ${i}`, 0);
        }
        break;
      case 'presetOne': // first example test
        // Set values for Preset One
        handleValueChange('Field 1', 1);
        handleValueChange('Field 2', 23);
        handleValueChange('Field 3', 22);
        handleValueChange('Field 4', 44);
        handleValueChange('Field 5', 5);
        handleValueChange('Field 6', 90);
        break;
      // more cases for additional options as needed
      default:
      // do nothing
        break;
    }
  };




  React.useEffect(() => {
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
      {Array.from({ length: 6 }, (_, i) => (
        <InputField
          key={i}
          labelText={`Field ${i + 1}`}
          inputPlaceholder={selectedOption ? `${selectedOption.label}` : `Field ${i + 1} Value`}
          helpText={`Help text for Field ${i + 1}`}
          showAsterisk={true}
          onValueChange={(value) => handleValueChange(`Field ${i + 1}`, value)}
          min={0}
          max={100}
        />
      ))}
    </Container>
  );
};


export default InputFields;