import { CounterState } from "./CounterState";
import { AuthState } from "./AuthState";

export interface RootState {
  counter: CounterState;
  auth: AuthState;
}
