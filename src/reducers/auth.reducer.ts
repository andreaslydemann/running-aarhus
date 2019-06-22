import { AuthState } from "types/states";
import { Action } from "types/common";
import { AUTH_TYPES } from "actions";
import { GET_INITIAL_STATE } from "constants";

let initialState: AuthState = {
  error: false,
  loading: false,
  currentUser: null,
  token: ""
};

export default (state: AuthState = initialState, action: Action<any>) => {
  switch (action.type) {
    case GET_INITIAL_STATE:
      return initialState;
    case AUTH_TYPES.GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    case AUTH_TYPES.SIGN_IN_SUCCESS:
      return { ...state, token: action.payload };
    case AUTH_TYPES.SIGN_IN_FAILURE:
      return { ...state, token: "" };
    case AUTH_TYPES.DELETE_USER_REQUEST:
      return { ...state, error: false, loading: true };
    case AUTH_TYPES.DELETE_USER_FAILURE:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};
