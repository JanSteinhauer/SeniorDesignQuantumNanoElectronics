import React from "react";

const styles = `
.search-bar {
  background-color: #262556;
  display: flex;
  height: 60px; /* Reduce the height for a sleeker look */
  align-items: center;
  justify-content: center;
  width: 100%; /* Full width */
}

.search-input {
  background-color: #fff;
  padding: 10px;
  border: none;
  border-radius: 30px; /* Increase the border-radius for a modern look */
  width: 80%; /* Make the search bar longer */
  max-width: 400px; /* Limit the maximum width */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  font-size: 16px; /* Adjust the font size */
  color: #333; /* Text color */
  outline: none; /* Remove the default input outline */
}

.search-input::placeholder {
  color: #888; /* Placeholder text color */
}
`;

const styleElement = document.createElement("style");
styleElement.type = "text/css";

if (styleElement.styleSheet) {
  styleElement.styleSheet.cssText = styles; // For IE
} else {
  styleElement.appendChild(document.createTextNode(styles)); // For other browsers
}

document.head.appendChild(styleElement);

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
