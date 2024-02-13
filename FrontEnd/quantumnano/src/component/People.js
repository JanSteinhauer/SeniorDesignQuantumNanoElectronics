import React, { useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'; // Importing icons

const ContactIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; // Adjust the space between icons as needed
  align-items: center;
  margin-top: 20px; // Adds some space above the icons
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Muli:700,400&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    font-size: 16px;
    font-family: 'Muli', sans-serif;
  }

  #rapp {
    height: 100%;
    display: flex;
    justify-content: center; // This will center all your items
    align-items: center; // This will center them vertically as well
    background-repeat: no-repeat;
  }
  @media screen and (max-height: 500px) {
    body {
      height: auto;
    }
  }
`;

// Define your styled components here
const AppWrap = styled.div`
  width: 350px; // Set this to the width of your People component
  margin: 20px ; // Remove any default margins
`;


const AppContainer = styled.div`
    visibility: visible; /* Ensure elements are visible by default */
    opacity: 1; /* Ensure elements are fully opaque by default */
  background: conic-gradient(from -90deg at 50% 105%, white, orchid);
  border-radius: 10px;
  margin: 45px auto;
  max-width: 350px;
  padding: 95px 15px 55px 15px;
  box-shadow: 0 19px 38px rgba(126, 55, 158, .017), 0 15px 12px rgba(43, 17, 46, .19);
  position: relative;
  overflow: hidden;
`;

// Continue defining other styled components similarly...

const HeaderImage = styled.div`
  width: 100%;
  height: 175px; 
  position: absolute;
  top: 0;
  left: -10%;
  right: -10%;
  margin: 0 auto;
  z-index: 1;
  overflow: hidden;

  img {
    height: 140%;
    position: sticky;
    bottom: 0;
    margin: auto;
    object-fit: contain;
  }
`

const OverlayElm = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #e359a7, #643d80);
  background-size: cover;
  opacity: .65;
  z-index: 2;
`

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 2px 22px 0px rgba(45, 41, 54, .55), 0px 0px 0px 4px rgba(45, 41, 54, 0.19);
  z-index: 3;

  img {
    width: 100%;
  }
`

const ContentContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  color: rgb(85 65 93);

  h2 {
    margin: 35px 0 12px;
    font-size: 1.7rem;
    font-weight: 700;
  }

  h3 {
    font-size: .8rem;
    font-weight: 700;
    margin-bottom: 25px;
    text-transform: uppercase;
    
    &:after {
      content: '';
      display: block;
      width: 40px;
      height: 3px;
      background-color: #cc88cc;
      margin: 0 auto;
      position: relative;
      top: 12px;
    }
  }

  p {
    font-size: 1rem;
  }
`

const Image = () => (<>
  <HeaderImage>
    <OverlayElm />
    <img src="https://images.unsplash.com/photo-1615818499660-30bb5816e1c7" alt="header image" />
  </HeaderImage>
</>)

const People = ({ profileImageSrc, profileAltText, name, role, email, githubLink, linkedInLink }) => {
  let app = useRef(null);
    let card = useRef(null);
    let img = useRef(null);
    let content = useRef(null);

      
    useEffect(() => {
        // Ensure the element is initially visible for accessibility, even though we'll animate visibility
        gsap.set(app.current, { css: { visibility: 'visible' } });
      
        const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
      
        if (card.current) {
          tl.fromTo(card.current, 
            { y: 1280, scale: 0, autoAlpha: 0 }, // Starting state
            { y: 0, scale: 1, autoAlpha: 1 } // Ending state
          );
        }
      
        // You can chain more animations for other elements here
        // For example, for img and content with slight delays
        if (img.current && content.current) {
          tl.fromTo(img.current, 
            { y: -30, scale: 1.7, autoAlpha: 0 }, 
            { y: 0, scale: 1, autoAlpha: 1, duration: 1.7 }, 
            "<0.5") // Starts 0.5 seconds after the previous animation starts
            .fromTo(content.current, 
            { autoAlpha: 0 }, 
            { autoAlpha: 1, duration: 2 }, 
            "<0.75"); // Overlapping start with the previous animation
        }
      }, []);
      

      return (
        <>
          <GlobalStyle />
          <div id="rapp" className="visualization">
            <AppWrap ref={app}>
              <AppContainer ref={card}>
                <Image headerImageSrc="https://images.unsplash.com/photo-1615818499660-30bb5816e1c7" altText="header image" />
                <HeaderContainer>
                  <ProfileImage ref={img}>
                    <img src={profileImageSrc} alt={profileAltText} />
                  </ProfileImage>
                </HeaderContainer>
                <ContentContainer ref={content}>
                  <h2>{name}</h2>
                  <h3>{role}</h3>
                  <ContactIcons>
                    <a href={githubLink} target="_blank" rel="noopener noreferrer">
                      <FaGithub size="24px" />
                    </a>
                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope size="24px" />
                </a>
                    <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn size="24px" />
                    </a>
                  </ContactIcons>
                </ContentContainer>
              </AppContainer>
            </AppWrap>
          </div>
        </>
      );
    };
    
export default People;
