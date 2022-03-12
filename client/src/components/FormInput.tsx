import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 1.2rem;

  div {
    width: 100%;
  }

  & {
    input {
      font-size: 1.7rem;
      width: 100%;
      padding: 1.5rem;

      &[type="password"] {
        letter-spacing: 0.2rem;
      }
    }

    label {
      font-size: 1.4rem;
    }
    p {
      font-size: 1.2rem;
      margin: 0.3rem 0.4em;
    }
  }
`;

interface Props {
  label: string;
  [props: string]: any;
}

const FormInput: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props as any);
  return (
    <Container>
      <TextField
        {...props}
        {...field}
        label={label}
        error={meta.touched && meta.error ? true : false}
        helperText={meta.touched && meta.error && meta.error}
      />
    </Container>
  );
};

export default FormInput;
