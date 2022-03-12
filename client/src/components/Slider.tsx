import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../assets/data/data";
import mediaDevices from "../style/mediaDevices";
import { Link } from "react-router-dom";
////////////////////////////////////////

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  @media ${mediaDevices.mobile} {
    display: none;
  }
`;

const Arrow = styled.div<{ direction: string }>`
  width: 4rem;
  height: 4rem;
  display: flex;
  background-color: #d4cece;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  left: ${(props) => props.direction === "left" && "1rem"};
  right: ${(props) => props.direction === "right" && "1rem"};
  opacity: 0.5;
  z-index: 1000;

  svg {
    font-size: 1.8rem;
  }
`;

const Wrapper = styled.div<{ slideIndex: number }>`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div<{ bg?: string }>`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 5rem;
`;

const Title = styled.h1`
  font-size: 7rem;
`;
const Desc = styled.p`
  margin: 5rem 0;
  font-size: 2rem;
  letter-spacing: 0.3rem;
  font-weight: 500;
`;
const Button = styled(Link)`
  padding: 1rem;
  background: #ff0059;
  color: white;
  cursor: pointer;
  font-size: 2rem;
  text-decoration: none;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
`;

////////////////////////////////////////
const Slider: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((sliderItem, inx) => (
          <Slide key={sliderItem.id} bg={sliderItem.bg}>
            <ImgContainer>
              <Image
                src={`${process.env.REACT_APP_API_URL_DEV}/imgs/slider-${
                  inx + 1
                }.jpg`}
              />
            </ImgContainer>
            <InfoContainer>
              <Title>{sliderItem.title}</Title>
              <Desc>{sliderItem.desc}</Desc>
              <Button to="/products">Shop Now</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
