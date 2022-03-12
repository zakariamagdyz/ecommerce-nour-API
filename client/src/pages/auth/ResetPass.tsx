import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

import {
  Container,
  Wrapper,
  Title,
  Button,
  ApiMessage,
  FormLink,
  StyledForm,
} from "../../style/auth.styles";

import { resetMetaData } from "../../redux/user/slice";
import { resetPass } from "../../redux/user/actions";
import { useParams } from "react-router-dom";
import FormInput from "../../components/FormInput";

// hooks
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

/////////////////////////////

interface Values {
  password: string;
  passwordConfirm: string;
}

const ResetPass: React.FC = () => {
  // Get reset token
  const { token } = useParams();
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();
  // Clear Error & success message
  useEffect(() => {
    return () => {
      dispatch(resetMetaData());
    };
  }, [dispatch]);

  const initialValues = {
    password: "",
    passwordConfirm: "",
  };
  const onSubmit = async (values: Values) => {
    await dispatch(resetPass({ token, data: values }));
  };
  const validationSchema = Yup.object({
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
        <Title>Reset Your Password</Title>
        {error && <ApiMessage error>{error}</ApiMessage>}

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <FormInput name="password" type="password" label="Password" />
              <FormInput
                name="passwordConfirm"
                type="password"
                label="Repeat Password"
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Reset Password"}
              </Button>
              <FormLink to="/forgot-password">Forgot Pass?</FormLink>
            </StyledForm>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default ResetPass;
