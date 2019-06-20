import { UserModel } from "types/models";

export type AuthState = {
  currentUser: UserModel | null;
  token: string;
};
