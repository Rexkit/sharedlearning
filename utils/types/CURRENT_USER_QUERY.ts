/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CURRENT_USER_QUERY
// ====================================================

export interface CURRENT_USER_QUERY_me {
  __typename: "User";
  id: string;
  username: string;
  email: string;
}

export interface CURRENT_USER_QUERY {
  me: CURRENT_USER_QUERY_me | null;
}
