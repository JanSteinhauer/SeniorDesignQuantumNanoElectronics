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
  const [typeVar1, setTypeVar1] = useState("10");
  const [typeVar2, setTypeVar2] = useState("12");
  const [typeVar3, setTypeVar3] = useState("13");
  const [typeVar4, setTypeVar4] = useState("14");
  const [typeVar5, setTypeVar5] = useState("15");
  const [typeVar6, setTypeVar6] = useState("16");

  const handleValuesChange = (index, value) => {
    switch(index) {
      case "1": 
        setTypeVar1(value);
        break;
      case "2":
        setTypeVar2(value);
        break;
      case "3":
        setTypeVar3(value);
        break;
      case "4":
        setTypeVar4(value);
        break;
      case "5":
        setTypeVar5(value);
        break;
      case "6":
        setTypeVar6(value);
        break;
      default:
        console.warn(`Unhandled field index: ${index}`);
    }
  }


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
          <CodeEditor 
  typeVar1={typeVar1} 
  typeVar2={typeVar2} 
  typeVar3={typeVar3} 
  typeVar4={typeVar4} 
  typeVar5={typeVar5} 
  typeVar6={typeVar6} 
/>
        </>
      ) : (
        <>
          <h2>Input Parameters for Material</h2>
          <InputFields onValuesChange={handleValuesChange} values={[typeVar1, typeVar2, typeVar3, typeVar4, typeVar5, typeVar6]} />
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