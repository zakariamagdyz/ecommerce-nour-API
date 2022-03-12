import { useState, useEffect } from "react";
import { IProduct } from "./useGetProduscts";
import { useOrderData } from "../context/order";
import axios from "../axios/callConfig";

export const useGetProduct = (id: string): IProduct => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { setSize } = useOrderData();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        const product = res.data.data.product as IProduct;
        setProduct(product);
        setSize(product.info[0].size);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  return product!;
};
