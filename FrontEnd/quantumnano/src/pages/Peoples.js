import React, {useState} from 'react';
import styled from 'styled-components';
import People from '../component/People';

const Peoples = () => {
    return (
      <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
       <People 
  profileImageSrc="https://i.ibb.co/DYqx99f/Whats-App-Image-2024-02-12-at-21-54-44.jpg" 
  profileAltText="profile image"
  name="Jan Steinhauer" 
  role="Front End Developer" 
  affiliation ="UT Austin | JMU Würzburg"
  email = "janst.geo@gmail.com"
  githubLink = "https://github.com/JanSteinhauer"
  linkedInLink = "https://www.linkedin.com/in/jan-steinhauer-a18611206/ "
/>
<People 
  profileImageSrc="https://i.ibb.co/JBQDqKR/default.jpg" 
  profileAltText="profile image"
  name="Som Wakdikar" 
  role="Back End Developer" 
  affiliation="UT Austin"
  email = "somwakdikar@gmail.com"
  githubLink = "https://github.com/somwakdikar"
  linkedInLink = "https://www.linkedin.com/in/somwakdikar"
/>
<People 
  profileImageSrc="https://i.ibb.co/JBQDqKR/default.jpg" 
  profileAltText="profile image"
  name="Ken Zhang" 
  role="Back End Developer" 
  affiliation="UT Austin"
  email = "kenzhang@utexas.edu"
  githubLink = "https://github.com/ktzhang20"
  linkedInLink = "https://www.linkedin.com/in/ktzhang20/"
/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
     
<People 
  profileImageSrc="https://i.ibb.co/JBQDqKR/default.jpg" 
  profileAltText="profile image"
  name="Yasir Habib" 
  role="Front End Developer" 
  affiliation="UT Austin"
  email = "yasirh002@gmail.com"
  githubLink = " https://github.com/yasitsme"
  linkedInLink = "https://www.linkedin.com/in/yasirhabib/"
/>
      </div>
      </div>
    );
  };
  
  export default Peoples;
  