import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background-image: 
    linear-gradient(
      rgba(255, 182, 193, 0.4),
      rgba(255, 182, 193, 0.4)
    ),
    url(https://images.unsplash.com/photo-1615818499660-30bb5816e1c7);
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Panel = styled.section`
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(6px);
  border-radius: 12px;
  width: 320px;
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
  margin-bottom: 2em; // Fixed typo from 'argin-bottom' to 'margin-bottom'
`;

const Button = styled.a`
  display: inline-block;
  padding: 1.5em 3em;
  background-image: linear-gradient(
    -45deg,
    rgba(9, 28, 60, 1) 0%,
    rgba(67, 46, 103, 1) 100%
  );
  text-decoration: none;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.2em;
  border-radius: 10em;
  color: white;
`;

const Blogentry = () => {
  return (
    <Background>
      <Panel>
        <Title>First Blog Entry</Title>
        <CardText>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur vel accusamus. Cumque, iste asperiores. Perferendis odio magnam nisi, eos provident nobis maxime nostrum nam, ipsum blanditiis quasi saepe aliquid!</p>
        </CardText>
        <CardText>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur vel accusamus. Cumque, iste asperiores. Perferendis odio magnam nisi, eos provident nobis maxime nostrum nam, ipsum blanditiis quasi saepe aliquid!</p>
        </CardText>
      </Panel>
    </Background>
  );
};

export default Blogentry;
