import * as constants from "./types";
export interface SignIn {
  type: constants.SIGN_IN;
  payload: string;
}
export interface SignOut {
  type: constants.SIGN_OUT;
}

export type AUTH = SignIn | SignOut;

export const signIn = (userId: string): SignIn => ({
  type: constants.SIGN_IN,
  payload: userId
});

export const signOut = (): SignOut => ({ type: constants.SIGN_OUT });
