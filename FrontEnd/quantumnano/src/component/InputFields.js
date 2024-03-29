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
          labelText="Metal" 
          // inputPlaceholder={values[0]}
          helpText="Help text for Field 1" 
          inputPlaceholder="Metal Value" 
          showAsterisk={true}
          onValueChange={(value) => handleValueChange("Field 1", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Insulator" 
          inputPlaceholder="Insulator Value" 
          helpText="Help text for Field 2" 
          showAsterisk={false}
          onValueChange={(value) => handleValueChange("Field 2", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Weyl 1" 
          inputPlaceholder="Weyl 1 Value" 
          helpText="Help text for Field 3" 
          showAsterisk={true}
          onValueChange={(value) => handleValueChange("Field 3", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
      </Row>
      <Row>
        <InputField 
          labelText="Weyl 2" 
          inputPlaceholder="Weyl 2 Value" 
          helpText="Help text for Field 4" 
          showAsterisk={false}
          onValueChange={(value) => handleValueChange("Field 4", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Weyl 3" 
          inputPlaceholder="Weyl 3 Value" 
          helpText="Help text for Field 5" 
          showAsterisk={true}
          onValueChange={(value) => handleValueChange("Field 5", value)} 
          min={0}  // Lower bound for Field 1
          max={100} // Upper bound for Field 1
        />
        <InputField 
          labelText="Chern 2D" 
          inputPlaceholder="Chern 2D Value" 
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