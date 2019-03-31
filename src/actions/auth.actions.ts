import { Action } from "./common";

export const AUTH_TYPES = {
  SIGN_IN_REQUEST: "SIGN_IN_REQUEST",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE"
};

export const signIn = (): Action<void> => {
  return {
    type: AUTH_TYPES.SIGN_IN_REQUEST
  };
};

export const signInSuccess = (token: string): Action<string> => {
  return {
    type: AUTH_TYPES.SIGN_IN_SUCCESS,
    payload: token
  };
};

export const signInFailure = (): Action<void> => {
  return {
    type: AUTH_TYPES.SIGN_IN_FAILURE
  };
};
