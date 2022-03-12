import styled from "styled-components";
import React from "react";
import axios from "../axios/callConfig";
// types
import { AxiosResponse, AxiosError } from "axios";
// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
// actions
import { clearError, selectOrder, setError } from "../redux/order/slice";
import { clearAllCart } from "../redux/cart/slice";
//components
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

// styles
const Title = styled.h2`
  text-align: center;
  margin-top: 50rem;
`;

// logic
const ProcessingOrder: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrder);
  const error = useAppSelector((state) => state.order.error);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const placeOrder = async () => {
      try {
        setLoading(true);
        const res: AxiosResponse = await axios.post("/orders", order);
        setLoading(false);
        dispatch(clearAllCart());
        navigate("/order-details", {
          state: res.data.data.order,
          replace: true,
        });
      } catch (error) {
        let err = error as AxiosError;
        if (!err.response) {
          throw err;
        }
        setError(err.response.data.message);

        setTimeout(() => navigate("/cart", { replace: true }), 5000);
      }
    };

    if (order) placeOrder();
    else navigate("/", { replace: true });

    return () => {
      dispatch(clearError());
    };
  }, []);
  return (
    <div>
      <Navbar />
      <Announcement />
      {loading && (
        <Title>
          You Order is being processed, Please wait for it to complete :)
        </Title>
      )}

      {error && <Message error>{error}</Message>}
    </div>
  );
};

export default ProcessingOrder;
