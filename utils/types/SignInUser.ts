/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignInUser
// ====================================================

export interface SignInUser_signin {
  __typename: "User";
  id: string;
}

export interface SignInUser {
  signin: SignInUser_signin | null;
}

export interface SignInUserVariables {
  email: string;
}
