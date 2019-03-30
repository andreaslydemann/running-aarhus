import { Action } from "./common";

export const AUTH_TYPES = {
  FACEBOOK_SIGN_IN_REQUEST: "FACEBOOK_SIGN_IN_REQUEST",
  FACEBOOK_SIGN_IN_SUCCESS: "FACEBOOK_SIGN_IN_SUCCESS",
  FACEBOOK_SIGN_IN_FAILURE: "FACEBOOK_SIGN_IN_FAILURE"
};

export const facebookSignIn = (): Action<void> => {
  return {
    type: AUTH_TYPES.FACEBOOK_SIGN_IN_REQUEST
  };
};

export const facebookSignInSuccess = (token: string): Action<string> => {
  return {
    type: AUTH_TYPES.FACEBOOK_SIGN_IN_SUCCESS,
    payload: token
  };
};

export const facebookSignInFailure = (): Action<void> => {
  return {
    type: AUTH_TYPES.FACEBOOK_SIGN_IN_FAILURE
  };
};
