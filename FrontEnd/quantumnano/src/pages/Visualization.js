import React from 'react';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import FileDropIn from '../component/FildDropIn';
import InputField from '../component/InputField';
import InputFields from '../component/InputFields';

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
      </div>
    );
  };
  
  export default Visualization;