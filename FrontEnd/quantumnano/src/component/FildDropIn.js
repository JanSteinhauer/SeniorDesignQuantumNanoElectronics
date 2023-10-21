import React, { useCallback, useState, useRef } from 'react';
import styled from 'styled-components';

const CenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
const csvToJson = (csv) => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const jsonResult = [];
  
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");
      const jsonObj = {};
  
      for (let j = 0; j < headers.length; j++) {
        jsonObj[headers[j]] = currentLine[j];
      }
  
      jsonResult.push(jsonObj);
    }
  
    return jsonResult;
  };
  

const DropArea = styled.div`
  border: 2px dashed ${props => props.dragging ? '#4A90E2' : '#E4E4E4'};
  border-radius: 8px;
  width: 500px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${props => props.dragging ? '#4A90E2' : '#9B9B9B'};
  transition: all 0.3s;
  background-color: ${props => props.dragging ? 'rgba(74, 144, 226, 0.1)' : 'white'};
  
  &:hover {
    border-color: #4A90E2;
    color: #4A90E2;
    cursor: pointer;
  }

  button {
    margin-top: 20px;
    background-color: #4A90E2;
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 4px; 
    cursor: pointer;
  }
`;
const UploadedFile = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid #E4E4E4;
    border-radius: 8px;
    background-color: #f6f6f6;
    width: 500px;  // Making it the same width as the DropArea
    justify-content: space-between;  // To space out elements within
`;

const FileName = styled.span`
    color: #333;
    flex: 1;  // Take up the remaining space to push other elements to the right
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const PreviewLink = styled.a`
    color: #4A90E2;
    text-decoration: none;
    margin-right: 20px;  // Some spacing from the close button

    &:hover {
        text-decoration: underline;
    }
`;

const CloseButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: darkred;
    }
`;
const HiddenFileInput = styled.input`
  display: none;
`;


const FileDropIn = () => {
    const [dragging, setDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);  // A ref to reference the hidden file input

  
    const onDragOver = useCallback((e) => {
      e.preventDefault();
    }, []);
  
    const onDragEnter = useCallback((e) => {
      e.preventDefault();
      setDragging(true);
    }, []);
  
    const onDragLeave = useCallback((e) => {
      e.preventDefault();
      setDragging(false);
    }, []);
  
    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragging(false);
      
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          const file = files[0];
      
          // Check if the file is a CSV file
          if (file.type !== "text/csv") {
            console.error("Dropped file is not a CSV file");
            return;
          }
      
          const reader = new FileReader();
      
          reader.onload = (event) => {
            const content = event.target.result;
            const jsonData = csvToJson(content); // Convert the CSV to JSON
            console.log(jsonData);
          };
      
          reader.onerror = (error) => {
            console.error("Error reading CSV file", error);
          };
      
          reader.readAsText(file);

        }
        setUploadedFile(files[0].name);

    }, []);

    const onSelectFileClick = () => {
        fileInputRef.current.click();
      };
      const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setUploadedFile(e.target.files[0].name);
          // You can also process the file here if needed
        }
      };
  
      const fileInputLabel = dragging ? "Release to drop" : "Select a file or drag and drop here";

    

      return (
        <div>
             <CenterContainer>
<DropArea 
            dragging={dragging} 
            onDragOver={onDragOver} 
            onDragEnter={onDragEnter} 
            onDragLeave={onDragLeave} 
            onDrop={onDrop}
        >
            <div>
                <div>{fileInputLabel}</div>
                <button onClick={onSelectFileClick}>SELECT FILE</button>
                <HiddenFileInput type="file" ref={fileInputRef} onChange={onFileChange} />
            </div>
        </DropArea>
        </CenterContainer>
        <CenterContainer>
            {uploadedFile && (
                <UploadedFile>
                    <FileName>{uploadedFile}</FileName>
                    <PreviewLink href="#" onClick={(e) => e.preventDefault()}>Preview</PreviewLink>
                    <CloseButton onClick={() => setUploadedFile(null)}>X</CloseButton>
                </UploadedFile>
            )}
        </CenterContainer>
        </div>
        
    );
};
  
export default FileDropIn;   