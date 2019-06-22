import { UserModel } from "types/models";

export type AuthState = {
  error: boolean;
  loading: boolean;
  currentUser: UserModel | null;
  token: string;
};
