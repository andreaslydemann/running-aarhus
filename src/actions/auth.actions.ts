import { Action } from "types/common";
import { UserModel } from "types/models";

export const AUTH_TYPES = {
  GET_INITIAL_STATE: "GET_INITIAL_STATE",
  GET_CURRENT_USER_REQUEST: "GET_CURRENT_USER_REQUEST",
  GET_CURRENT_USER_SUCCESS: "GET_CURRENT_USER_SUCCESS",
  SIGN_IN: "SIGN_IN",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
  SIGN_OUT: "SIGN_OUT",
  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE"
};

export const getInitialState = (): Action<void> => {
  return {
    type: AUTH_TYPES.GET_INITIAL_STATE
  };
};

export const getCurrentUserRequest = (): Action<void> => {
  return {
    type: AUTH_TYPES.GET_CURRENT_USER_REQUEST
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
    type: AUTH_TYPES.DELETE_USER_REQUEST
  };
};

export const deleteUserFailure = (): Action<void> => {
  return {
    type: AUTH_TYPES.DELETE_USER_FAILURE
  };
};
