import { Action } from "types/common";
import { UserModel } from "types/models";

export const AUTH_TYPES = {
  GET_INITIAL_STATE: "GET_INITIAL_STATE",
  GET_CURRENT_USER: "GET_CURRENT_USER",
  GET_CURRENT_USER_SUCCESS: "GET_CURRENT_USER_SUCCESS",
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

export const getCurrentUser = (): Action<void> => {
  return {
    type: AUTH_TYPES.GET_CURRENT_USER
  };
};

export const getCurrentUserSuccess = (user: UserModel): Action<UserModel> => {
  return {
    type: AUTH_TYPES.GET_CURRENT_USER_SUCCESS,
    payload: user
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
