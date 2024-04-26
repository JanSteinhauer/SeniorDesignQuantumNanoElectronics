import React, {useState} from 'react';
import styled from 'styled-components';
import Blogentry from '../component/Blogentry';


const CardText = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
min-height: 100vh;
`;

const Blog = () => {
 
  return (
  // <Blogentry></Blogentry>
  <CardText>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-f6NFMmWQH0?si=NHvmsrmbMt0wrHrI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
  </CardText>
  );
};

export default Blog;