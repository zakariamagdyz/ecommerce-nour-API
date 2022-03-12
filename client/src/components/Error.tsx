import styled from "styled-components";

export const ErrorImageOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ImageProps {
  imageUrl: string;
}

export const ErrorImageContainer = styled.div<ImageProps>`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;
export const ErrorImageText = styled.h2`
  font-size: 2rem;
  color: #2f8e89;
  margin-top: 3rem;
  font-family: monospace;
`;

// types
interface Props {
  message: string;
  imageUrl: string;
}

const Error: React.FC<Props> = ({ message, imageUrl }) => {
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl={imageUrl} />
      <ErrorImageText>{message}</ErrorImageText>
    </ErrorImageOverlay>
  );
};

export default Error;
