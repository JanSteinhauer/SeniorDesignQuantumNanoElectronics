import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown'
import geometryPath from '../component/geometry.md';
import functionPath from '../component/Functions.md';

const Panel = styled.section`
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(6px);
  border-radius: 12px;
  width: 800px;
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
  margin-bottom: 2em;
`;


// New Component
const DocumentationPanel = ({ title, description1, description2 }) => {
  const [markdown, setMarkdown] = useState('');
  const [funcmarkdown, setFuncMarkdown] = useState('');
  const checkType = (content) => {
    console.log(`Type of description1: ${typeof content}`);
  };
 

  useEffect(() => {
    fetch(geometryPath)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
    fetch(functionPath)
      .then((response) => response.text())
      .then((text) => setFuncMarkdown(text));
  }, []);

  // Call the function to check the type of description1
  checkType(description1);
  return (
    <Panel>
      <Title>{title}</Title>
      <CardText>
        {title === 'Geometry Documentation' && <Markdown>{markdown}</Markdown>}
        {title === 'Functions Documentation' && <Markdown>{funcmarkdown}</Markdown>}
      </CardText>
     
    </Panel>
  );
};

export default DocumentationPanel;
