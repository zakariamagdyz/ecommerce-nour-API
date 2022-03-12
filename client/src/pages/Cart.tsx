import styled from "styled-components";
import axios from "../axios/callConfig";
// types
import { AxiosResponse, AxiosError } from "axios";
import { IOrder, setError, setOrder } from "../redux/order/slice";
// components
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import mediaDevices from "../style/mediaDevices";
import BagProduct from "../components/BagProduct";
import StripeCheckout, { Token } from "react-stripe-checkout";
// hooks
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { selectAmount } from "../redux/cart/slice";
import { useState, useEffect } from "react";

//////////////////////////////////////
// style
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 2rem;
  margin-top: 8rem;
  margin-bottom: 12rem;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 2rem; ;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const TopButton = styled.button<{ theme: string }>`
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;

  background: ${(props) =>
    props.theme === "filled" ? "black" : "transparent"};
  border: ${(props) => props.theme === "filled" && "none"};
  color: ${(props) => props.theme === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 1rem;

  @media ${mediaDevices.mobile} {
    display: none;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${mediaDevices.mobile} {
    flex-direction: column;
    gap: 4rem;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 1rem;
  padding: 2rem;
  align-self: flex-start;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div<{ theme: string }>`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.theme === "total" && "500"};
  font-size: ${(props) => props.theme === "total" && "2.4rem"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Tip = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: red;
`;

//////////////////////////////////////

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(selectAmount);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [stripeToken, setStripeToken] = useState<Token | null>(null);

  const onToken = (token: Token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const sendStripeToken = async () => {
      try {
        const res: AxiosResponse = await axios.post("/orders/payment", {
          token: stripeToken?.id,
          amount: totalPrice * 100,
        });
        const order: IOrder = {
          items: cartItems,
          amount: totalPrice,
          contact: {
            email: stripeToken!.email,
            billing_details: res.data.data.data.billing_details,
          },
        };
        dispatch(setOrder(order));
      } catch (error) {
        let err = error as AxiosError<{ message: string }>;
        if (!err.response) {
          throw err;
        }
        dispatch(setError(err.response.data.message));
      } finally {
        navigate("/processing-order");
      }
    };

    if (stripeToken) sendStripeToken();
  }, [stripeToken]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cartItems.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton theme="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItems.map((item) => (
              <BagProduct
                key={`${item._id}-${item.size}-${item.color}`}
                item={item}
              />
            ))}
          </Info>
          {!!cartItems.length && (
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem theme="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Nour Shop"
                billingAddress
                shippingAddress
                description={`Your total is $${totalPrice}`}
                amount={totalPrice * 100}
                token={onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY!!}
              >
                <SummaryButton>CHECK OUT NOW</SummaryButton>
                <Tip>
                  * Please use 4242 4242 4242 4242 to continue payment process
                </Tip>
              </StripeCheckout>
            </Summary>
          )}
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
