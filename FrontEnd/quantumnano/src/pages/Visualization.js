import React, {useState} from 'react';
import styled from 'styled-components';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import FileDropIn from '../component/FildDropIn';
import InputField from '../component/InputField';
import InputFields from '../component/InputFields';
import CodeEditor from '../component/CodeEditor';
import Button from '../component/StyledButton';
import ToggleSwitch from '../component/ToggleSwitch';

const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const Visualization = () => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  return (
    <div className="visualization">
      <h1>Input your parameters to get a Visualisation 🧮</h1>
      <FileDropIn/>
      <ToggleSwitchContainer>
        <ToggleSwitch onSwitch={setShowCodeEditor} />
      </ToggleSwitchContainer>

      {showCodeEditor ? (
        <>
          <h2>Code Editor</h2>
          <CodeEditor />
        </>
      ) : (
        <>
          <h2>Input Parameters for Material</h2>
          <InputFields/>
          <h2>Input Parameters for Run Configuration</h2>
          <InputFields/>
          <h2>Input Parameters for Geometry</h2>
          <InputFields/>
        </>
      )}
      <Button heading={"Start Visualization"}/>
    </div>
  );
};

export default Visualization;