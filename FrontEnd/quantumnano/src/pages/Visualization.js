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


import InputFieldsFake from '../component/InputFieldsFake';
import quantumImage from '../assets/images/quantum.png';



const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const Visualization = () => {
  const [showImage, setShowImage] = useState(false);


  const handleButtonClick = () => {
    setShowImage(true);
  };
  return (
    <div className="visualization">
      <h1>Drop in your Julia file to get a Visualization 🌌</h1>
      <FileDropIn/>
    <Button heading={"Start Visualization"} onClick={handleButtonClick} />
    {showImage && (
      <img src={quantumImage} alt="Quantum Visualization" style={{ display: 'block', margin: 'auto' }} />
      )}
    </div>
  );
};

export default Visualization;