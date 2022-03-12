import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../../axios/callConfig.js";
import { IUser } from "./slice";

////////////////////////////////

// Check if user logged in
interface ValidationErrors {
  message: string;
  status: number;
}

const handleError = (error: any, rej: Function) => {
  let err = error as AxiosError<ValidationErrors>;

  if (!err.response) {
    throw err;
  }
  return rej(err.response.data);
};

export const getUserState = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: ValidationErrors }
>("getUserState/get", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/users/isSignedIn");
    return data.data.user as IUser;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Sign up
interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signUp = createAsyncThunk<
  string,
  SignUpData,
  {
    rejectValue: ValidationErrors;
  }
>("signUp/post", async (body, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/users/signUp", body);

    return data.message;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Activate account

export const activateAccount = createAsyncThunk<
  IUser,
  string,
  { rejectValue: ValidationErrors }
>("activeAccount/post", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const { data } = await axios.post("/users/activateAccount", {
      token: body,
    });

    return data.data.user as IUser;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Sign out

export const signOut = createAsyncThunk<
  string,
  undefined,
  { rejectValue: ValidationErrors }
>("signout/get", async (_, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    return await axios.get("/users/signout");
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Login

interface SignInBody {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk<
  IUser,
  SignInBody,
  { rejectValue: ValidationErrors }
>("signIn/post", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const { data } = await axios.post("/users/signin", body);
    return data.data.user;
  } catch (error: any) {
    return handleError(error, rejectWithValue);
  }
});

// Forgot password
interface forgotPassBody {
  email: string;
}

export const forgotPass = createAsyncThunk<
  string,
  forgotPassBody,
  { rejectValue: ValidationErrors }
>("forgotpass/patch", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const { data } = await axios.patch("/users/forgotPassword", body);
    return data.message;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Reset password
interface ResetPassBody {
  token: string | undefined;
  data: ResetData;
}
interface ResetData {
  password: string;
  passwordConfirm: string;
}

export const resetPass = createAsyncThunk<
  IUser,
  ResetPassBody,
  { rejectValue: ValidationErrors }
>("resetPass/patch", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const { data } = await axios.patch(
      `/users/resetPassword/${body.token}`,
      body.data
    );
    return data.data.user as IUser;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Google sign in

export const googleLogin = createAsyncThunk<
  IUser,
  string,
  { rejectValue: ValidationErrors }
>("googleLogin/post", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;

  try {
    const { data } = await axios.post("/users/google-login", { token: body });

    return data.data.user as IUser;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});
