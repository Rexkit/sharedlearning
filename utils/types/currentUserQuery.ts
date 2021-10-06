/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUserQuery
// ====================================================

export interface currentUserQuery_me {
  __typename: "User";
  id: string;
  username: string;
  email: string;
}

export interface currentUserQuery {
  me: currentUserQuery_me | null;
}
