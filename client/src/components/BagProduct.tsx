import React from "react";
import styled from "styled-components";
// componnets
import { Add, Remove } from "@mui/icons-material";
import { Color } from "../components/CartElement";
// types
import { IProduct } from "../redux/cart/slice";
// actions
import { remove, increase } from "../redux/cart/slice";
// hooks
import { useAppDispatch } from "../redux/hooks";

// Styles
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
`;
const Image = styled.img`
  width: 20rem;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;

const ProductSize = styled.span``;
const Details = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 2.4rem;
  margin: 0.5rem;
`;
const ProductPrice = styled.div`
  font-size: 3rem;
  font-weight: 200;
`;

const BagProduct: React.FC<{ item: IProduct }> = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <Product>
      <ProductDetail>
        <Image src={item.img} />
        <Details>
          <ProductName>
            <b>Product :</b> {item.title}
          </ProductName>
          <ProductId>
            <b>ID:</b> {item._id.slice(11)}
          </ProductId>
          <Color photo={item.color} />

          <ProductSize>
            <b>Size :</b> {item.size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Add onClick={() => dispatch(increase(item))} />
          <ProductAmount>{item.quantity}</ProductAmount>
          <Remove onClick={() => dispatch(remove(item))} />
        </ProductAmountContainer>
        <ProductPrice>$ {item.price}</ProductPrice>
      </PriceDetail>
    </Product>
  );
};

export default BagProduct;
