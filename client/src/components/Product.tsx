import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

// types
import { IProduct } from "../hooks/useGetProduscts";

///////////////////////////////////////

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;
const Container = styled.div`
  flex: 1;
  margin: 0.5rem;
  min-width: 28rem;
  max-width: 35rem;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #e9f5f5;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//////////////////////////////////////
interface Props {
  item: IProduct;
}
const Product: React.FC<Props> = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        {/* <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon> */}
        <Icon>
          <StyledLink to={`/products/${item._id}`}>
            <SearchOutlinedIcon />
          </StyledLink>
        </Icon>
        {/* <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon> */}
      </Info>
    </Container>
  );
};

export default Product;
