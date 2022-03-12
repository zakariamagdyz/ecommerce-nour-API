import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form } from "formik";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 40rem;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
`;
export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 3rem;
  text-align: center;
`;
export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  min-width: 40%;
  border: none;
  padding: 1.5rem 2rem;
  background: teal;
  cursor: pointer;
  color: white;
  margin-top: 1.5rem;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.3);

  &:disabled {
    cursor: not-allowed;
    background: #ebebe4;
    color: #c6c6c6;
  }
`;

export const FormLink = styled(Link)`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  text-decoration: underline;
  display: block;
  cursor: pointer;
  align-self: flex-start;
  text-transform: capitalize;
`;

export const ApiMessage = styled.p<{ error?: boolean }>`
  background-color: ${(props) =>
    props.error ? "var(--err-color)" : "var(--success-color)"};
  padding: 0.8rem;
  color: #f5f5f5;
  border-radius: 0.4rem;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
`;

export const BtnsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;

  button {
    margin: 0 !important;
  }

  button:last-child {
    cursor: pointer;
    background: #f70;
  }
`;

export const LinksContainer = styled.div`
  margin-top: 1.2rem;
  a {
    margin: 0;
    margin-bottom: 0.8rem;
  }
`;
