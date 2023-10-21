import React from 'react';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import FileDropIn from '../component/FildDropIn';

const Visualization = () => {
    return (
      <div className="visualization">
        <h1>Input your parameters to get a Visualisation 🧮</h1>
        <FileDropIn></FileDropIn>
      </div>
    );
  };
  
  export default Visualization;