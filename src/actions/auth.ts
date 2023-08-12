import { SignInType, SignUpType, GoogleAuthenticationType } from "./types";
import {
  ERROR,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_SUCCESS,
  LOGOUT,
  SIGN_UP,
} from "../constants";

import * as api from "../api";

/**
 * @description Action creator for signing in.
 * @param formData is an object containing email & password of the user trying to sign in.
 * @param successRedirect is a function to to redirect the user to the PostContainer component if the sign in is sucessful!
 * @return {[Promise<void>]} Returns a promise of Promise<void>
 */
export const signIn: SignInType = async (formData) => {
  const { email, password } = formData;
  const result = await api.signIn(email, password);

  return result.data;
};

/**
 * @description Action creator for signing up.
 * @param formData is an object containing firstName, lastName, email, password, confirmPassword of the user trying to sign up.
 * @param successRedirect is a function to to redirect the user to the PostContainer component if the sign up is sucessful!
 * @return {[Promise<void>]} Returns a promise of Promise<void>
 */
export const signUp: SignUpType = async (formData) => {
  const { fullName, email, password, confirmPassword } = formData;
  const result = await api.signUp({
    fullName,
    email,
    password,
    confirmPassword,
  });

  return result.data;
};

export const googleAuthentication: GoogleAuthenticationType =
  (token, redirect) => async (dispatch: Function) => {
    try {
      // const result = await api.googleAuthentication(token);

      // const { user, token } = result.data;
      // dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: { user, token } });

      redirect(); // Redirect to the Feed Component after Authentication was successfull!
    } catch (err: any) {
      dispatch({ type: GOOGLE_AUTH_FAILURE });
      dispatch({
        type: ERROR,
        payload: { ON: SIGN_UP, message: err.response.data.message },
      });
    }
  };

/**
 * @description Action creator returning a LOGOUT action to logout the user
 * @return An object retutning the type LOGOUT
 */
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
