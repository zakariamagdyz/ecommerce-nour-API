import styled from "styled-components";
import React from "react";
import mediaDevices from "../style/mediaDevices";
import { useOrderData } from "../context/order";
import ProductColor from "./ProductColor";

//types
import { IProduct } from "../hooks/useGetProduscts";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
  width: 80%;
  @media ${mediaDevices.tabPort} {
    width: 100%;
  }
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const FilterSize = styled.select`
  margin-left: 1rem;
  padding: 0.5rem;
`;
const FilterSizeOption = styled.option``;

interface Props {
  product: IProduct;
}

const ProductFilters: React.FC<Props> = ({ product }) => {
  const { size, handleSize } = useOrderData();

  const filterdColor = product.info.filter((info) => info.size === size);

  return (
    <FilterContainer>
      <Filter>
        <FilterTitle>Color</FilterTitle>

        {filterdColor &&
          filterdColor.length &&
          filterdColor[0].colors.map((color) => (
            <ProductColor key={color._id} {...color} />
          ))}
      </Filter>
      <Filter>
        <FilterTitle>Size</FilterTitle>
        <FilterSize name="size" onChange={handleSize} value={size}>
          {product.info.map((obj) => (
            <FilterSizeOption key={obj._id}>{obj.size}</FilterSizeOption>
          ))}
        </FilterSize>
      </Filter>
    </FilterContainer>
  );
};

export default React.memo(ProductFilters);
