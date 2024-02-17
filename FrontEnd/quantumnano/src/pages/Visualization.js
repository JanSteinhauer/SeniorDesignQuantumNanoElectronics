import React, { useState } from 'react';
import styled from 'styled-components';
import InputFields from '../component/InputFields';
import DropDown from '../component/DropDown';


const VisualizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Visualization = () => {
  const [selectedOption, setSelectedOption] = useState(null);


  const handleDropdownSelect = (option) => {
    console.log('Selected Option:', option);
    setSelectedOption(option);
  };


  return (
    <VisualizationContainer>
      <h1>MENU</h1>
      {/* <DropDown
        options={[
          { value: 'resetAll', label: 'Reset All' },
          { value: 'presetOne', label: 'Preset One' },
          { value: 'presetTwo', label: 'Preset Two' },
          // Add more options as needed
        ]}
        selectedOption={selectedOption}
        onSelect={handleDropdownSelect}
      /> */}
      <InputFields selectedOption={selectedOption} />
    </VisualizationContainer>
  );
};


export default Visualization;