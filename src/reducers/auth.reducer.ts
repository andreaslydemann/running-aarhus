import { AuthState } from "types/states";
import { Action } from "types/common";
import { AUTH_TYPES } from "actions";
import { GET_INITIAL_STATE } from "constants";

let initialState: AuthState = {
  token: ""
};

export default (state: AuthState = initialState, action: Action<any>) => {
  switch (action.type) {
    case GET_INITIAL_STATE:
      return initialState;
    case AUTH_TYPES.SIGN_IN_SUCCESS:
      return { token: action.payload };
    case AUTH_TYPES.SIGN_IN_FAILURE:
      return { token: "" };
    default:
      return state;
  }
};
