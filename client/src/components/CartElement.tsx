import React from "react";
import styled from "styled-components";
// types
import { IProduct } from "../redux/cart/slice";
// components

// styles

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;
const ImgContainer = styled.figure`
  width: 10rem;
  height: 10rem;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Content = styled.div``;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const Color = styled.div<{ photo: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 1rem 0.5rem;
  background-image: ${(props) =>
    `url(${process.env.REACT_APP_API_URL_DEV}/colors/${props.photo})`};
  background-size: cover;
  background-position: center;
`;

const CartElement: React.FC<IProduct> = ({
  title,
  quantity,
  color,
  img,
  price,
  size,
}) => {
  return (
    <Container>
      <ImgContainer>
        <Img src={img} alt={title} />
      </ImgContainer>
      <Content>
        <Info>
          <Color photo={color} />
          <span>{size}</span>
        </Info>
        <span>
          {quantity} X ${price}
        </span>
      </Content>
    </Container>
  );
};

export default CartElement;
