import React from "react";
import styled from "styled-components";

///////////////////////////////////////////////////

const Container = styled.div`
  height: 3rem;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: 1.4rem;
`;

///////////////////////////////////////////////////////

const Announcement = () => {
  return <Container>Super Deal! Free shipping on orders over $50</Container>;
};

export default Announcement;
