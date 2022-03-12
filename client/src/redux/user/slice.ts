import { createSlice } from "@reduxjs/toolkit";
import {
  activateAccount,
  signOut,
  signUp,
  signIn,
  forgotPass,
  resetPass,
  getUserState,
  googleLogin,
} from "./actions";

////////////////////////

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  photo: string;
}

type UserState = {
  currentUser: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null | undefined;
  successMsg: string | null;
};

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  successMsg: null,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // for Clear error whenever page changed
    resetMetaData: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserState.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoggedIn = true;
      })

      ////////////////////////////////////////////
      .addCase(activateAccount.pending, (state) => {
        state.error = null;
        state.successMsg = null;
        state.isLoading = true;
      })
      .addCase(activateAccount.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.successMsg =
          "Welcome to Nour store, Your account has been activated";
      })
      .addCase(activateAccount.rejected, (state) => {
        state.error = "Something went wrong, Please try againreesdf";
        state.isLoading = false;
      }) ///////////////////////////////////////////////////////////////
      .addCase(signIn.pending, (state) => {
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoggedIn = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(googleLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoggedIn = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      }) ///////////////////////////////////////////////////////////////
      .addCase(signOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.isLoggedIn = false;
        state.currentUser = null;
      }) ///////////////////////////////////////////////////////////////
      .addCase(signUp.pending, (state) => {
        state.error = null;
        state.successMsg = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.successMsg = payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else state.error = action.error.message;
      }) ///////////////////////////////////////////////////////////////
      .addCase(forgotPass.pending, (state) => {
        state.error = null;
        state.successMsg = null;
      })
      .addCase(forgotPass.fulfilled, (state, { payload }) => {
        state.successMsg = payload;
      })
      .addCase(forgotPass.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      }) ///////////////////////////////////////////////////////////////
      .addCase(resetPass.pending, (state) => {
        state.error = null;
      })
      .addCase(resetPass.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoggedIn = true;
      })
      .addCase(resetPass.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { resetMetaData } = userSlice.actions;

export default userSlice.reducer;
