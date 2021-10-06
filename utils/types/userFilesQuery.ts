/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userFilesQuery
// ====================================================

export interface userFilesQuery_files {
  __typename: "File";
  id: string;
  filename: string;
  type: string;
  user_id: string;
  page_id: string;
}

export interface userFilesQuery {
  files: (userFilesQuery_files | null)[] | null;
}

export interface userFilesQueryVariables {
  pageid: string;
}
