import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  max-width: 300px;  // Reduced width
  margin: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  position: relative;
  text-align: left;  // Added for left alignment
`;

const RequiredStar = styled.span`
  color: red;
  margin-left: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;  // Added to include padding and border in total width
  margin-bottom: 5px;
`;

const HelpText = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
  color: #888;  // Made text a bit lighter for subtlety
`;

const CharCount = styled.span`
  display: block;
  font-size: 12px;
  text-align: right;
  color: #888;  // Made text a bit lighter for subtlety
`;

const InputField = () => {
  const [text, setText] = useState('');
  const maxLength = 60;

  return (
    <Container>
      <Label>
        Label <RequiredStar>*</RequiredStar>
      </Label>
      <Input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        maxLength={maxLength}
        placeholder="Input Text"
      />
      <HelpText>Help Text</HelpText>
      {/* <CharCount>{text.length}/{maxLength}</CharCount> */}
    </Container>
  );
};

export default InputField;
