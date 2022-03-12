import { Fragment } from "react";
import DCategories from "../components/Categories";
import { useGetCategory } from "../hooks/useGetCategory";

const Categories = () => {
  const categories = useGetCategory();
  return (
    <Fragment>
      <DCategories
        isLoading={categories.isLoading}
        data={categories.data}
        isError={categories.isError}
      />
    </Fragment>
  );
};

export default Categories;
