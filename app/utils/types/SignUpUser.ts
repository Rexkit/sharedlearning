/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpUser
// ====================================================

export interface SignUpUser_signup {
  __typename: "User";
  id: string;
}

export interface SignUpUser {
  signup: SignUpUser_signup | null;
}

export interface SignUpUserVariables {
  username: string;
  email: string;
  password: string;
}
