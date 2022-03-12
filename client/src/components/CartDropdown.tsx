import styled from "styled-components";
// reducers
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import CartElement from "./CartElement";
// types

//// style

const Container = styled.div`
  width: 25rem;
  height: 35rem;
  overflow: auto;
  position: absolute;
  right: 0;
  top: 3rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border: 1px solid #ccc;
  background: #f7f7f7;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const CartList = styled.div`
  margin-bottom: auto;
  text-align: center;
`;
const Button = styled.button`
  padding: 1.5rem;
  background: #333;
  color: white;
  cursor: pointer;
  border: none;
  margin-top: 1rem;
`;
const Title = styled.p`
  margin-top: 3rem;
`;

// logic
interface Props {
  handleDropdown: () => void;
}
const CartDropdown: React.FC<Props> = ({ handleDropdown }) => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  return (
    <Container>
      <CartList>
        {!cartItems.length ? (
          <Title>Your Cart Is Empty.</Title>
        ) : (
          cartItems.map(
            (
              item // get a unique key of comibe size & color & id
            ) => (
              <CartElement
                key={`${item._id}-${item.color}-${item.size}`}
                {...item}
              />
            )
          )
        )}
      </CartList>
      <Button
        onClick={() => {
          // Go to checkout page
          navigate("/cart");
          // Hide Cart dropdown
          handleDropdown();
        }}
      >
        Go To Checkout
      </Button>
    </Container>
  );
};

export default CartDropdown;
