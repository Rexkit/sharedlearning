/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userPagesQuery
// ====================================================

export interface userPagesQuery_pages {
  __typename: "Page";
  id: string;
  name: string;
  description: string;
  user_id: string;
}

export interface userPagesQuery {
  pages: (userPagesQuery_pages | null)[] | null;
}
