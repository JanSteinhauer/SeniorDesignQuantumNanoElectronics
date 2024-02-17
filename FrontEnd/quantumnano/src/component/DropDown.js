import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const DropdownContainer = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  position: relative;
`;


const DropdownButton = styled.button`
  font-size: 16px;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;


const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 50%; /* Center the dropdown horizontally */
  transform: translateX(-50%); /* Center the dropdown horizontally */
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1;
`;


const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;


const DropDown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect && onSelect(option);
    setIsOpen(false);
  };


  useEffect(() => {
    const handleBodyClick = (event) => {
      if (!event.target.closest(`.${DropdownContainer.styledComponentId}`)) {
        setIsOpen(false);
      }
    };


    document.body.addEventListener('click', handleBodyClick);


    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);


  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </DropdownButton>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem key={option.value} onClick={() => handleOptionSelect(option)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};


export default DropDown;