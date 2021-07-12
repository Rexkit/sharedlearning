/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pageQuery
// ====================================================

export interface pageQuery_page {
  __typename: "Page";
  id: string;
  name: string;
  description: string;
}

export interface pageQuery {
  page: pageQuery_page | null;
}

export interface pageQueryVariables {
  pageid: string;
}
