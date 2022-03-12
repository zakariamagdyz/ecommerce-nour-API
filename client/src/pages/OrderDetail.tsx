import { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
// types
import { IProduct } from "../redux/cart/slice";

//  hooks
import { useNavigate } from "react-router-dom";

// styles
const Container = styled.div``;
const OrderContetnt = styled.div`
  width: 50rem;
  height: 50;
  background: #eee;
  border: 1px solid #ccc;
  padding: 3rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  margin: 20rem auto;
`;
const Contact = styled.div`
  margin: 2rem 0;
`;
const Detail = styled.p`
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 1rem;
  cursor: pointer;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;
const SubTitle = styled.h2`
  display: inline-block;
  border-bottom: 0.5rem solid #666;
`;

const OrderDetail = () => {
  const { state }: any = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <OrderContetnt>
        <Title>Thank you for choosing us ! :)</Title>
        <SubTitle>order details</SubTitle>
        <Contact>
          <Detail>
            <b>Name :</b> {state?.contact.billing_details.name}
          </Detail>
          <Detail>
            <b>Email :</b> {state?.contact.email}
          </Detail>
          <Detail>
            <b>Address :</b> {state?.contact.billing_details.address.line1}
          </Detail>
          <Detail>
            <b>Items :</b>
            {state?.items.map((item: IProduct) => item.title).join(", ")}
          </Detail>
          <Detail>
            <b>Amount :</b> ${state?.amount}
          </Detail>
          <Detail>
            <b>Status :</b> {state?.status}
          </Detail>
        </Contact>

        <Button onClick={() => navigate("/", { replace: true })}>
          Continue Shopping
        </Button>
      </OrderContetnt>
    </Container>
  );
};

export default OrderDetail;

// TODO:
// navigate to shopping with replace
