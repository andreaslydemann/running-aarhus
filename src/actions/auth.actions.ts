import { Action } from "./common";

export const AUTH_TYPES = {
  FACEBOOK_LOGIN_REQUEST: "FACEBOOK_LOGIN_REQUEST",
  FACEBOOK_LOGIN_SUCCESS: "FACEBOOK_LOGIN_SUCCESS",
  FACEBOOK_LOGIN_FAILURE: "FACEBOOK_LOGIN_FAILURE"
};

export const facebookLogin = (): Action<void> => {
  return {
    type: AUTH_TYPES.FACEBOOK_LOGIN_REQUEST
  };
};

export const facebookLoginSuccess = (token: string): Action<string> => {
  return {
    type: AUTH_TYPES.FACEBOOK_LOGIN_SUCCESS,
    payload: token
  };
};

export const facebookLoginFailure = (): Action<void> => {
  return {
    type: AUTH_TYPES.FACEBOOK_LOGIN_FAILURE
  };
};
