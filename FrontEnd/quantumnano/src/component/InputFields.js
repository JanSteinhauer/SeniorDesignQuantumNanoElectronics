import React from 'react';
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

const InputFields = () => {
  return (
    <InputFieldsContainer>
      <Row>
        <InputField 
          labelText="Field 1" 
          inputPlaceholder="Placeholder 1" 
          helpText="Help text for Field 1" 
          showAsterisk={true} 
        />
        <InputField 
          labelText="Field 2" 
          inputPlaceholder="Placeholder 2" 
          helpText="Help text for Field 2" 
          showAsterisk={false} 
        />
        <InputField 
          labelText="Field 3" 
          inputPlaceholder="Placeholder 3" 
          helpText="Help text for Field 3" 
          showAsterisk={true} 
        />
      </Row>
      <Row>
        <InputField 
          labelText="Field 4" 
          inputPlaceholder="Placeholder 4" 
          helpText="Help text for Field 4" 
          showAsterisk={false} 
        />
        <InputField 
          labelText="Field 5" 
          inputPlaceholder="Placeholder 5" 
          helpText="Help text for Field 5" 
          showAsterisk={true} 
        />
        <InputField 
          labelText="Field 6" 
          inputPlaceholder="Placeholder 6" 
          helpText="Help text for Field 6" 
          showAsterisk={false} 
        />
      </Row>
    </InputFieldsContainer>
  );
}

export default InputFields;
