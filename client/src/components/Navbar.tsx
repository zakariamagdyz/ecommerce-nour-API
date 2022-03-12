import { Fragment, useState } from "react";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import mediaDevices from "../style/mediaDevices";
import { Link } from "react-router-dom";
import { signOut } from "../redux/user/actions";

//hooks
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import CartDropdown from "./CartDropdown";
////////////////////////////////////////////////////////////

const Container = styled.div`
  height: 6rem;
`;

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  @media ${mediaDevices.mobile} {
    padding: 1rem;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Center = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const Language = styled.span`
  cursor: pointer;

  @media ${mediaDevices.mobile} {
    display: none;
  }
`;

const SearchContainer = styled.div`
  border: 0.05rem solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  padding: 0.5rem;

  @media ${mediaDevices.mobile} {
    margin-left: 0;
    margin-right: 1rem;
  }
`;

const Input = styled.input`
  border: none;
  :focus {
    outline: none;
  }

  @media ${mediaDevices.mobile} {
    width: 100%;
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: left;
`;

const MenuItem = styled(Link)`
  font-size: 1.4rem;
  text-decoration: none;
  cursor: pointer;
  margin-left: 2.5rem;
  color: #333 !important;
  text-transform: capitalize;

  span {
    min-width: 1rem;
    height: 1.5rem;
  }

  svg {
    font-size: 2rem;
  }

  @media ${mediaDevices.mobile} {
    margin-left: 1.5rem;
  }
`;

////////////////////////////////////////////////////////////
const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector((state) => state.cart.items.length);
  const [showDropdown, setDropdown] = useState(false);

  const dropdownHandler = () => {
    setDropdown(!showDropdown);
  };
  return (
    <Container>
      <Wrapper>
        {/* <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: "1.6rem" }} />
          </SearchContainer>
        </Left> */}
        <Center>
          <Logo>NOUR Shop.</Logo>
        </Center>
        <Right>
          <MenuItem to="/">home</MenuItem>
          {!isLoggedIn ? (
            <Fragment>
              <MenuItem to="/register">register</MenuItem>
              <MenuItem to="/login">sign in</MenuItem>
            </Fragment>
          ) : (
            <Fragment>
              <MenuItem as="div">{user && user.name.split(" ")[0]}</MenuItem>
              <MenuItem as="div" onClick={() => dispatch(signOut())}>
                sign out
              </MenuItem>
            </Fragment>
          )}
          <MenuItem as="div" onClick={dropdownHandler}>
            <Badge badgeContent={itemCount} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
          {showDropdown && <CartDropdown handleDropdown={dropdownHandler} />}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
