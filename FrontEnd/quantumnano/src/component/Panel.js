import React from 'react';
import styled from 'styled-components';

const Panel = styled.section`
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(6px);
  border-radius: 12px;
  width: 500px;
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

const SafeHtml = ({ html }) => <div dangerouslySetInnerHTML={{ __html: html }} />;


// New Component
const DocumentationPanel = ({ title, description1, description2 }) => {
  return (
    <Panel>
      <Title>{title}</Title>
      <CardText>
      <SafeHtml html={description1} />
      </CardText>
      <CardText>
      <SafeHtml html={description2} />
      </CardText>
    </Panel>
  );
};

export default DocumentationPanel;
