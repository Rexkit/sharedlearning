import { gql, DocumentNode } from "@apollo/client";

export const CURRENT_USER_QUERY: DocumentNode = gql`
    query CURRENT_USER_QUERY {
        me {
            id,
            username,
            email
        }
    }
`;

export const SIGNIN_QUERY: DocumentNode = gql`
    mutation SignInUser($email: String!) {
        signin(email: $email) {
            id
        }
    }
`;

export const SIGNUP_QUERY: DocumentNode = gql`
    mutation SignUpUser($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            id
        }
    }
`;