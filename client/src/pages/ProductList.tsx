import styled from "styled-components";
import { useState } from "react";
import Products from "../containers/Products";
import mediaDevices from "../style/mediaDevices";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Newsletter from "../components/Newsletter";
//////////////////////////////////////
const Container = styled.div``;

const Title = styled.h1`
  margin: 8rem 0 3rem 0;
  padding: 1rem;
  text-transform: capitalize;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 2rem;

  @media ${mediaDevices.tabPort} {
    margin: 1rem;
  }

  @media ${mediaDevices.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const FilterText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 2rem;
`;

const Select = styled.select`
  padding: 1rem;
  margin-right: 2rem;
  @media ${mediaDevices.mobile} {
    margin-bottom: 1rem;
  }
`;

const Option = styled.option``;

/////////////////////////////////////

const ProductList: React.FC = () => {
  const { search } = useLocation();

  const [filter, setFilter] = useState({
    sort: "-createdAt",
    size: "",
    color: "",
  });
  const colors = [
    { color: "Color", value: "" },
    { color: "White", value: "White" },
    { color: "Black", value: "Black" },
    { color: "Red", value: "Red" },
    { color: "Blue", value: "Blue" },
    { color: "Yellow", value: "Yellow" },
    { color: "Green", value: "Green" },
  ];
  const sizes = [
    { size: "Size", value: "" },
    { size: "XS", value: "XS" },
    { size: "S", value: "S" },
    { size: "M", value: "M" },
    { size: "L", value: "L" },
    { size: "XL", value: "XL" },
  ];

  const sorts = [
    { sort: "Newest", value: "-createdAt" },
    { sort: "Price (asc)", value: "price" },
    { sort: "Price (desc)", value: "-price" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{search.slice(1)}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products: </FilterText>
          <Select value={filter.color} onChange={handleChange} name="color">
            {colors.map(({ color, value }, i) => (
              <option key={i} value={value}>
                {color}
              </option>
            ))}
          </Select>
          <Select onChange={handleChange} name="size" value={filter.size}>
            {sizes.map(({ size, value }, i) => (
              <option key={i} value={value}>
                {size}
              </option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products: </FilterText>
          <Select name="sort" value={filter.sort} onChange={handleChange}>
            {sorts.map(({ sort, value }, i) => (
              <Option value={value} key={i}>
                {sort}
              </Option>
            ))}
          </Select>
        </Filter>
      </FilterContainer>
      <Products productsFilter={filter} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
