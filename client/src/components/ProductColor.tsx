import styled, { css } from "styled-components";
import { useOrderData } from "../context/order";
//types

const matchedColor = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid #ccc;
  padding: 1px;
  opacity: 1;
`;

const FilterColor = styled.div<{ photo: string; isMatched: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 1rem 0.5rem;
  background-image: ${(props) =>
    `url(${process.env.REACT_APP_API_URL_DEV}/colors/${props.photo})`};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  opacity: 0.5;
  ${(props) => props.isMatched && matchedColor}
`;

const ProductColor: React.FC<{ photo: string }> = ({ photo }) => {
  const { color: orderColor, setColor } = useOrderData();

  return (
    <FilterColor
      photo={photo}
      isMatched={photo === orderColor}
      onClick={() => setColor(photo)}
    />
  );
};

export default ProductColor;
