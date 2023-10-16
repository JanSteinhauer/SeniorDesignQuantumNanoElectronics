import React from "react";
import bannerBG from "./bannerBG.png";


const styles = `
.div-banner-bg {
    align-items: center;
    background-image: url(${bannerBG});
    background-position: 50% 50%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center; /* Center vertically */
    position: relative;
    width: 100%; /* Full width */
    text-align: center; /* Center text horizontally */
  }
  
  .div-banner-bg .div-container {
    max-width: 1000px;
    width: 100%;
  }
  
  .div-banner-bg .heading {
    display: flex;
    flex-direction: column;
  }
  
  .div-banner-bg .quantum-mechanics {
    color: #ffffff;
    font-family: "Source Sans Pro-ExtraLight", Helvetica;
    font-size: 104px;
    font-weight: 200;
    letter-spacing: 31.2px;
    line-height: 104px;
    text-align: center;
  }
  
  .div-banner-bg .atomistic-simulation-wrapper {
    display: flex;
    flex-direction: column;
  }
  
  .div-banner-bg .atomistic-simulation {
    color: #909090;
    font-family: "Source Sans Pro-Regular", Helvetica;
    font-size: 34.7px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 34.7px;
    text-align: center;
    text-shadow: 0px -1px 3px #000000;
    margin-top: 100px;
    white-space: nowrap;
  }
`;

const Banner = () => {
  return (
    <div className="div-banner-bg">
      <div className="div-container">
        <div className="heading">
          <div className="quantum-mechanics">
            Quantum Mechanics
            <br />
            Modeling
          </div>
        </div>
        <div className="atomistic-simulation-wrapper">
          <div className="atomistic-simulation">Atomistic simulation of&nbsp;&nbsp;materials</div>
        </div>
      </div>
    </div>
  );
};

const styleElement = document.createElement("style");
styleElement.type = "text/css";

if (styleElement.styleSheet) {
  styleElement.styleSheet.cssText = styles; // For IE
} else {
  styleElement.appendChild(document.createTextNode(styles)); // For other browsers
}

document.head.appendChild(styleElement);

export default Banner;
