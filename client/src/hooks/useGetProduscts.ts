import { useState, useEffect } from "react";
import axios from "../axios/callConfig";

export interface IProduct {
  _id: string;
  title: string;
  desc: string;
  img: string;
  info: Info[];
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Info {
  size: string;
  colors: Color[];
  _id: string;
}

export interface Color {
  photo: string;
  color: string;
  _id: string;
}

export interface IProducts {
  isLoading: boolean;
  isError: boolean;
  data: null | IProduct[];
}

export interface IFilter {
  color: string;
  size: string;
  sort: string;
}

export const useGetProducts = (id: string, filter: IFilter): IProducts => {
  const [products, setProducts] = useState<IProducts>({
    isLoading: false,
    data: null,
    isError: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { sort, size, color } = filter;
        let res;

        setProducts((prev) => ({ ...prev, isLoading: true }));

        if (id) {
          res = await axios.get(
            `/categories/${id}/products?sort=${sort}&color=${color}&size=${size}`
          );
        } else {
          res = await axios.get(
            `/products?sort=${sort}&color=${color}&size=${size}`
          );
        }

        const { products } = res.data?.data;
        setProducts((prev) => ({ ...prev, isLoading: false, data: products }));
      } catch (error) {
        setProducts((prev) => ({ ...prev, isLoading: false, error: true }));
      }
    };

    fetchProducts();
  }, [setProducts, id, filter]);

  return products;
};
