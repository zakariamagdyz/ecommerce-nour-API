import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  Container,
  Wrapper,
  Title,
  Button,
  StyledForm,
  FormLink,
  ApiMessage,
} from "../../style/auth.styles";

import { resetMetaData } from "../../redux/user/slice";
import { forgotPass } from "../../redux/user/actions";
import FormInput from "../../components/FormInput";
//hooks
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

//////////////////////////////////////////////

interface Values {
  email: string;
}

const ForgotPass = () => {
  const error = useAppSelector((state) => state.user.error);
  const successMsg = useAppSelector((state) => state.user.successMsg);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetMetaData());
    };
  }, [dispatch]);

  const initialValues = {
    email: "",
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    await dispatch(forgotPass(values));
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().max(55).email(),
  });

  return (
    <Container>
      <Wrapper>
        <Title>Forgot Your Password?</Title>
        {successMsg && <ApiMessage>{successMsg}</ApiMessage>}
        {error && <ApiMessage error>{error}</ApiMessage>}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <FormInput name="email" label="Email Address" type="email" />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Send Mail"}
              </Button>

              <FormLink to="/login">REMEMBER PASS?</FormLink>
            </StyledForm>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default ForgotPass;
