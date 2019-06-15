import { Action } from "types/common";

export const AUTH_TYPES = {
  GET_INITIAL_STATE: "GET_INITIAL_STATE",
  SIGN_IN: "SIGN_IN",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
  SIGN_OUT: "SIGN_OUT",
  DELETE_USER: "DELETE_USER"
};

export const getInitialState = (): Action<void> => {
  return {
    type: AUTH_TYPES.GET_INITIAL_STATE
  };
};

export const signIn = (): Action<void> => {
  return {
    type: AUTH_TYPES.SIGN_IN
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

export const signOut = (): Action<void> => {
  return {
    type: AUTH_TYPES.SIGN_OUT
  };
};

export const deleteUser = (): Action<void> => {
  return {
    type: AUTH_TYPES.DELETE_USER
  };
};
