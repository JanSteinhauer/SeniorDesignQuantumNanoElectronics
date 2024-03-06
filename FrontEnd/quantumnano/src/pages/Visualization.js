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
import axios from 'axios';



const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const Visualization = () => {
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: 'graph visualisation' }, // Change 'nature' to whatever search term you want
        headers: {
          Authorization: 'Client-ID WSJ6iVewCRNKkNpLIKicKVAZpzACaZLBjNAeX4uuh0I' // Replace YOUR_UNSPLASH_ACCESS_KEY with your actual key
        }
      });

      // Set the first image from the results, if available
      if (response.data.results.length > 0) {
        setImage(response.data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
    }
  };



  const handleButtonClick = () => {
    // setShowImage(true);
    const url = "https://colab.research.google.com/drive/19NveoRpS07f5atTti2Hdu-E_YvqP2-sc?usp=sharing";
    window.open(url, '_blank');
  };
  return (
    <div className="visualization">
      <h1>Drop in your Julia file to get a Visualization 🌌</h1>
      <FileDropIn/>
    <Button heading={"Start Google Colab"} onClick={handleButtonClick} />
    <div>
    <Button heading={"Start Visualization"} onClick={fetchImage} />

    </div>
    <div>
    {image && <img src={image.urls.small} alt={image.alt_description} />}

    </div>

    {showImage && (
      <img src={quantumImage} alt="Quantum Visualization" style={{ display: 'block', margin: 'auto' }} />
      )}
    </div>
    
  );
};

export default Visualization;