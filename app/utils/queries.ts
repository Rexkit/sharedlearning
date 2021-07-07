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

export const USER_FILES_QUERY: DocumentNode = gql`
    query userFilesQuery($pageid: String!) {
        files(page_id: $pageid) {
            id,
            filename,
            type,
            user_id,
            page_id
        }
    }
`;

export const PAGE_TEXT_CONTENT: DocumentNode = gql`
    query pageTextContent($pageid: String!) {
        pageTextContent(page_id: $pageid) {
            data
        }
    }
`;

export const SET_PAGE_TEXT_CONTENT: DocumentNode = gql`
    mutation setPageTextContent($pageid: String!, $content: JSON!) {
        setPageTextContent(page_id: $pageid, content: $content)
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

export const DELETE_PAGE_QUERY: DocumentNode = gql`
    mutation deletePage($page_id: String!) {
        deletePage(page_id: $page_id)
    }
`;