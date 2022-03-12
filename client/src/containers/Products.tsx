import React from "react";
import { useParams } from "react-router-dom";
import DProducts from "../components/Products";
import { useGetProducts, IFilter } from "../hooks/useGetProduscts";
///////////////////////////////////////////

interface Props {
  productsFilter: IFilter;
}

const Products: React.FC<Props> = ({ productsFilter }) => {
  const { id } = useParams();

  const products = useGetProducts(id!, productsFilter);

  const emptyMessage = "No products were found matching your selection ";

  return (
    <DProducts
      isLoading={products.isLoading}
      message={emptyMessage}
      data={products.data}
      isError={products.isError}
    ></DProducts>
  );
};

export default Products;
