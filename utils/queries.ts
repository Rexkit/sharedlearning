import { gql, DocumentNode } from "@apollo/client";

export const CURRENT_USER_QUERY: DocumentNode = gql`
    query currentUserQuery {
        me {
            id,
            username,
            email
        }
    }
`;

export const USER_PAGES_QUERY: DocumentNode = gql`
    query userPagesQuery {
        pages {
            id,
            name,
            description,
            user_id
        }
    }
`;

export const SIGNIN_QUERY: DocumentNode = gql`
    mutation SignInUser($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
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

export const LOGOUT_QUERY: DocumentNode = gql`
    mutation Logout {
        logout
    }
`;

export const CREATE_PAGE_QUERY: DocumentNode = gql`
    mutation createPage($name: String!, $description: String!) {
        createPage(name: $name, description: $description)
    }
`;