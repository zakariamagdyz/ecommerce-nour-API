import styled from "styled-components";
import Product from "./Product";
import withChecks from "./withChecks";
//typs
import { IProduct } from "../hooks/useGetProduscts";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  margin-bottom: 8rem;
  margin-top: 2rem;
`;

interface Props {
  data: IProduct[];
}

const Products: React.FC<Props> = ({ data: products }) => {
  return (
    <Container>
      {products.map((product) => (
        <Product key={product._id} item={product} />
      ))}
    </Container>
  );
};

export default withChecks(Products);
