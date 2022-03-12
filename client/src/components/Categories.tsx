import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import mediaDevices from "../style/mediaDevices";
import withChecks from "./withChecks";
import { ICategory } from "../hooks/useGetCategory";
////////////////////////////////////////////////////////////

const Container = styled.div`
  display: flex;
  margin: 12rem 0;
  padding: 2rem;
  flex-wrap: wrap;

  gap: 3rem;

  @media ${mediaDevices.mobile} {
    flex-direction: column;
  }
`;

////////////////////////////////////////

interface Iprops {
  data: ICategory[];
}

const Categories: React.FC<Iprops> = ({ data: categories }) => {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </Container>
  );
};

export default withChecks(Categories);
