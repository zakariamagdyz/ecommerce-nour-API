import { useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  FormLink,
  Container,
  Title,
  Wrapper,
  StyledForm,
  ApiMessage,
  Button,
} from "../../style/auth.styles";
import { resetMetaData } from "../../redux/user/slice";
import { signUp } from "../../redux/user/actions";
import FormInput from "../../components/FormInput";

// hooks
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

//////////////////////////////////////////////

const Agreement = styled.span`
  font-size: 1.2rem;
  margin: 1.5rem 0;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

///////////////////////////////////////////////
interface Values {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);
  const successMsg = useAppSelector((state) => state.user.successMsg);

  useEffect(() => {
    return () => {
      dispatch(resetMetaData());
    };
  }, [dispatch]);

  const initialValues: Values = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const onSubmit = async (values: Values) => {
    await dispatch(
      signUp({
        ...values,
        name: values.firstName.concat(" ", values.lastName),
      })
    );
    //resetForm();
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required().max(20),
    lastName: Yup.string().required().max(20),
    userName: Yup.string().max(20),
    email: Yup.string().required().email().max(55),
    password: Yup.string().required().min(8).max(55),
    passwordConfirm: Yup.string()
      .required()
      .min(8)
      .max(55)
      .test("passwordConfirm", "Two passwords don't match", function (val) {
        return this.parent.password === val;
      }),
  });

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {successMsg && <ApiMessage>{successMsg}</ApiMessage>}
        {error && <ApiMessage error>{error}</ApiMessage>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <NameContainer>
                <FormInput label="First Name" name="firstName" />
                <FormInput label="Last Name" name="lastName" />
              </NameContainer>
              <FormInput label="Email Address" name="email" type="email" />
              <FormInput label="Password" name="password" type="password" />
              <FormInput
                label="Repeat Password"
                name="passwordConfirm"
                type="password"
              />

              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </Agreement>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Create"}
              </Button>
            </StyledForm>
          )}
        </Formik>
        <FormLink to="/login">Have AN ACCOUNT?</FormLink>
      </Wrapper>
    </Container>
  );
};

export default Register;
