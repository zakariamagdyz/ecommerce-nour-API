import React from "react";
import styled from "styled-components";
import devicesBreakpoints from "../style/mediaDevices";
import WarningIcon from "@mui/icons-material/Warning";

const Container = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  gap: 1rem;

  svg {
    font-size: 4rem;
    fill: red;
  }
`;
const Header = styled.h2<{ error: boolean }>`
  font-size: 3rem;
  letter-spacing: 0.2rem;
  text-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  color: ${(props) => (props.error ? "red" : "#666")};

  @media ${devicesBreakpoints.tabPort} {
    font-size: 2rem;
  }
  @media ${devicesBreakpoints.mobile} {
    font-size: 1.5rem;
  }
`;

type Props = {
  error?: boolean;
  children: string;
};

const Message: React.FC<Props> = ({ error, children }) => {
  return (
    <Container>
      {error && <WarningIcon />}
      <Header error={!!error}>{children}</Header>
    </Container>
  );
};

export default Message;
