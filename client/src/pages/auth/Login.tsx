import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Container,
  Wrapper,
  Title,
  Button,
  StyledForm,
  FormLink,
  ApiMessage,
  BtnsContainer,
  LinksContainer,
} from "../../style/auth.styles";
import { resetMetaData } from "../../redux/user/slice";
import { signIn, googleLogin } from "../../redux/user/actions";
import { useEffect } from "react";
import FormInput from "../../components/FormInput";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

//hooks
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

//////////////////////////////////////////////
///////////////////////////////////////////////

interface Values {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetMetaData());
    };
  }, [dispatch]);

  const onSuccess = async (res: any) => {
    const { tokenId } = res;
    await dispatch(googleLogin(tokenId));
  };

  const onFailure = (err: GoogleLoginResponse) => {
    console.log(err);
  };

  const initialValues = { email: "", password: "" };

  const onSubmit = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    await dispatch(signIn(values));
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().max(55).email(),
    password: Yup.string().required().min(8).max(55),
  });

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {error && <ApiMessage error>{error}</ApiMessage>}

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <FormInput name="email" label="Email" />
              <FormInput name="password" type="password" label="Password" />
              <BtnsContainer>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "LOADING.." : "LOGIN"}
                </Button>

                <GoogleLogin
                  clientId="938971102462-4h8b456g0oumd448kvndoe4l6qb9def5.apps.googleusercontent.com"
                  buttonText="Google sign in"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </BtnsContainer>
              <LinksContainer>
                <FormLink to="/forgot-password">
                  DO NOT YOU REMEMBER THE PASSWORD?
                </FormLink>
                <FormLink to="/register">CREATE A NEW ACCOUNT</FormLink>
              </LinksContainer>
            </StyledForm>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Login;
