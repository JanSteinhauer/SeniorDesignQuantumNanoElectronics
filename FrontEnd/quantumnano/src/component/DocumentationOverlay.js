import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavSidebar from './NavSidebar';
import DocumentationPanel from './Panel'


const Background = styled.div`
  background-image: 
    linear-gradient(
      rgba(255, 182, 193, 0.4),
      rgba(255, 182, 193, 0.4)
    ),
    url(https://images.unsplash.com/photo-1615818499660-30bb5816e1c7);
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Panel = styled.section`
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(6px);
  border-radius: 12px;
  width: 320px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  padding: 60px;
  box-shadow: rgba(255, 255, 255, 0.5) -20px -20px 45px inset,
    rgba(0, 0, 0, 0.1) 10px 10px 20px, rgba(0, 0, 0, 0.06) 5px 5px 10px;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 40%,
      rgba(255, 255, 255, 0) 40%
    );
    pointer-events: none;
  }
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: 1000;
  margin-top: 0;
`;

const CardText = styled.div`
  font-size: 14px;
  line-height: 1.45;
  opacity: 0.8;
  margin-bottom: 2em; // Fixed typo from 'argin-bottom' to 'margin-bottom'
`;

const Button = styled.a`
  display: inline-block;
  padding: 1.5em 3em;
  background-image: linear-gradient(
    -45deg,
    rgba(9, 28, 60, 1) 0%,
    rgba(67, 46, 103, 1) 100%
  );
  text-decoration: none;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.2em;
  border-radius: 10em;
  color: white;
`;

const DocumentationOverlay = () => {

  const [title, setTitle] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const SafeHtml = ({ html }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

  const documents = {
    'Material Determination Tutorial': {
      title: "Material Determination Tutorial",
      description1: "An example - Material Determination <br> To determine the material type based on position coordinates, follow these<br>steps:<br>1. Define the position coordinates using a Vector{Float64}.<br>R = [x, y, z]<br>2. Call the geometry function to determine the material type.<br>material_type = geometry(R) <br>The geometry function returns a string indicating the material type<br>(insulator or GaAs).",
      description2: "The `geometry_params` named tuple contains parameters crucial for defining the device's geometry, including the matrix of unit cell lattice vectors and the number of times to tile the cell over space.",
    },
    'Doc 2': {
      title: "Document 2 Title",
      description1: "Description 1 for Document 2...",
      description2: "Description 2 for Document 2...",
    },
    'Doc 3': {
      title: "Document 3 Title",
      description1: "Description 1 for Document 3...",
      description2: "Description 2 for Document 3...",
    },
    'Doc 4': {
      title: "Document 4 Title",
      description1: "Description 1 for Document 4...",
      description2: "Description 2 for Document 4...",
    },
    'Doc 5': {
      title: "Document 5 Title",
      description1: "Description 1 for Document 5...",
      description2: "Description 2 for Document 5...",
    },
   
  };

  useEffect(() => {
    // Initialize with the first document, for example
    const initialDocKey = 'Material Determination Tutorial';
    handleLinkClick(initialDocKey);
  }, []); // The empty dependency array ensures this runs once on mount
  
  

  // // Simulate fetching data from a document or an API
  // useEffect(() => {
  //   setTitle("Material Determination Tutorial");
  //   setDescription1("An example - Material Determination <br> To determine the material type based on position coordinates, follow these<br>steps:<br>1. Define the position coordinates using a Vector{Float64}.<br>R = [x, y, z]<br>2. Call the geometry function to determine the material type.<br>material_type = geometry(R) <br>The geometry function returns a string indicating the material type<br>(insulator or GaAs).");
  //   setDescription2("The `geometry_params` named tuple contains parameters crucial for defining the device's geometry, including the matrix of unit cell lattice vectors and the number of times to tile the cell over space.");
  // }, []); // Empty dependency array means this effect runs once on mount


  const handleLinkClick = (docKey) => {
    const doc = documents[docKey];
    if (doc) {
      setTitle(doc.title);
      setDescription1(doc.description1);
      setDescription2(doc.description2);
    }
  };
  
    // // Function to update the title
    // const handleLinkClick = (newTitle) => {
    // setTitle(newTitle);
   
    // };

  return (
    <Background>
       <NavSidebar onLinkClick={handleLinkClick} />
       <DocumentationPanel title={title} description1={description1} description2={description2} />
    </Background>
  );
};

export default DocumentationOverlay;
