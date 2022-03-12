import { useState, useEffect } from "react";
import axios from "../axios/callConfig";

export interface ICategory {
  _id: string;
  name: string;
  photo: string;
}

export interface ICategories {
  isLoading: boolean;
  isError: boolean;
  data: ICategory[] | null;
}

export interface ICategoriesResponse {
  status: string;
  results: number;
  data: Data;
}

export interface Data {
  categories: ICategory[];
}

export const useGetCategory: () => ICategories = () => {
  const [categories, setCategories] = useState<ICategories>({
    isLoading: false,
    data: null,
    isError: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //  1) Set is loading = true
        setCategories((prev: ICategories) => ({ ...prev, isLoading: true }));

        // 2) Fetching Data
        const { data } = await axios.get<ICategoriesResponse>("/categories");
        const categories = data.data.categories;

        // 3) Set data & isLoading = false
        setCategories(
          (prev): ICategories => ({
            ...prev,
            data: categories,
            isLoading: false,
          })
        );
      } catch (error) {
        // 4) Handle error
        setCategories(
          (prev): ICategories => ({
            ...prev,
            isError: true,
            isLoading: false,
          })
        );
      }
    };

    fetchCategories();
  }, [setCategories]);

  return categories;
};
