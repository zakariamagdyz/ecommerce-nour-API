import React from "react";
import styled from "styled-components";

export const SpinnerOverlay = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const SpinnerContainer = styled.div`
  width: 6rem;
  height: 6rem;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-top-color: #636767;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const Spinner: React.FC = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;
