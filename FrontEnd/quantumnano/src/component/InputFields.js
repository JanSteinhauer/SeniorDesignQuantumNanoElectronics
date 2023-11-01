import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;

  & > div:not(:first-child) {
    margin-left: 15px;
  }
`;

const InputFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
`;


const InputFields = ({ onValuesChange, values = [] }) => {

  const handleValueChange = (field, value) => {
    const index = field.replace('Field ', '');  // Extracting index from field name
    onValuesChange && onValuesChange(index, value);
  }

  return (
    <InputFieldsContainer>
      <Row>
        <InputField 
          labelText="Field test" 
          // inputPlaceholder={values[0]}
          helpText="Help text for Field 1" 
          inputPlaceholder="Placeholder 1" 
          showAsterisk={true}
          onValueChange={(value) => handleValueChange("Field 1", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Field 2" 
          inputPlaceholder="Placeholder 2" 
          helpText="Help text for Field 2" 
          showAsterisk={false}
          onValueChange={(value) => handleValueChange("Field 2", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Field 3" 
          inputPlaceholder="Placeholder 3" 
          helpText="Help text for Field 3" 
          showAsterisk={true}
          onValueChange={(value) => handleValueChange("Field 3", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
      </Row>
      <Row>
        <InputField 
          labelText="Field 4" 
          inputPlaceholder="Placeholder 4" 
          helpText="Help text for Field 4" 
          showAsterisk={false}
          onValueChange={(value) => handleValueChange("Field 4", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Field 5" 
          inputPlaceholder="Placeholder 5" 
          helpText="Help text for Field 5" 
          showAsterisk={true}
          onValueChange={(value) => handleValueChange("Field 5", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Field 6" 
          inputPlaceholder="Placeholder 6" 
          helpText="Help text for Field 6" 
          showAsterisk={false}
          onValueChange={(value) => handleValueChange("Field 6", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
      </Row>
    </InputFieldsContainer>
  );
}
export default InputFields;