import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { activateAccount } from "../../redux/user/actions";
import { resetMetaData } from "../../redux/user/slice";
import Spinner from "../../components/Spinner";

//hooks
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

///////////////////////////////////////////

const Container = styled.div``;

const Content = styled.div`
  min-height: 60vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 8rem;
`;

const Message = styled.h2<{ error?: boolean }>`
  text-align: center;
  padding-top: 3rem;
  font-size: 3rem;
  color: ${(props) =>
    props.error ? "var(--err-color)" : "var(--success-color);"};
`;

///////////////////////////////////////////

const Activation: React.FC = () => {
  const { activation } = useParams();
  const navigate = useNavigate();
  const redirectTime = 2500;
  const error = useAppSelector((state) => state.user.error);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const activationMsg = useAppSelector((state) => state.user.successMsg);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(activateAccount(activation!))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, redirectTime);
      })
      .catch(() =>
        setTimeout(() => {
          navigate("/register", { replace: true });
        }, redirectTime)
      );

    return () => {
      dispatch(resetMetaData());
    };
  }, [dispatch, activation, navigate]);

  return (
    <Container>
      <Navbar />
      <Content>
        {isLoading && <Spinner />}
        {activationMsg && <Message>{activationMsg}</Message>}
        {error && <Message error={!!error}> {error}</Message>}
      </Content>
      <Footer />
    </Container>
  );
};

export default Activation;
