import React from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import mediaDevices from "../style/mediaDevices";

///////////////////////////////////////////

const Container = styled.div`
  height: 40vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 7rem;
  margin-bottom: 2rem;
`;

const Desc = styled.div`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 2rem;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 3.5rem;
  background-color: #fff;
  display: flex;
  border: 1px solid lightgray;
  justify-content: space-between;

  @media ${mediaDevices.mobile} {
    width: 80%;
  }
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 1rem;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

///////////////////////////////////////////
const Newsletter: React.FC = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
