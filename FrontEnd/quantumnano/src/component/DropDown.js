import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  position: relative;
  text-align: right; /* Right-align the dropdown button */
`;

const DropdownButton = styled.button`
  font-size: 20px; /* Increase the font size */
  padding: 15px; /* Increase the padding */
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
  top: calc(100% + 5px); /* Position the dropdown list below the button */
  left: 50%; /* Center the dropdown horizontally */
  transform: translateX(-50%); /* Center the dropdown horizontally */
  width: max-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  background-color: #fff; /* Add a background color */
  border: 1px solid #ccc; /* Add a border for styling */
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* Show the list only when isOpen is true */
  z-index: 1;
`;

const DropdownItem = styled.li`
  padding: 12px; /* Increase the padding */
  cursor: pointer;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')}; /* Make hovered option bold */
  font-size: 18px; /* Increase the font size */
`;

const DropDown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect && onSelect(option);
    setIsOpen(false);
  };

  const handleOptionHover = (option) => {
    setHoveredOption(option);
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
      <DropdownButton onMouseEnter={() => setIsOpen(true)} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </DropdownButton>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            bold={option === hoveredOption}
            onMouseEnter={() => handleOptionHover(option)}
            onClick={() => handleOptionSelect(option)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default DropDown;
