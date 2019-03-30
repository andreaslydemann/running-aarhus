import { Action } from "actions/common";
import { AuthState } from "./states";
import { AUTH_TYPES } from "actions";

let initialState: AuthState = {
  token: ""
};

export default function(state: AuthState = initialState, action: Action<any>) {
  switch (action.type) {
    case AUTH_TYPES.FACEBOOK_SIGN_IN_SUCCESS:
      return { token: action.payload };
    case AUTH_TYPES.FACEBOOK_SIGN_IN_FAILURE:
      return { token: "" };
    default:
      return state;
  }
}
