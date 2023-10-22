import React from 'react';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import FileDropIn from '../component/FildDropIn';
import InputField from '../component/InputField';
import InputFields from '../component/InputFields';
import CodeEditor from '../component/CodeEditor';
import Button from '../component/StyledButton';

const Visualization = () => {
    return (
      <div className="visualization">
        <h1>Input your parameters to get a Visualisation 🧮</h1>
        <FileDropIn/>
        <h2>Input Parameters for Material</h2>
        <InputFields/>
        <h2>Input Parameters for Run Configuration</h2>
        <InputFields/>
        <h2>Input Parameters for Geometry</h2>
        <InputFields/>
        <br></br>
        <h2>Code Editor</h2>
        <CodeEditor/>
        <Button heading={"Start Visualization"}/>
      </div>
    );
  };
  
  export default Visualization;