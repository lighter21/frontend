import gql from "graphql-tag";

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      created_at
      user {
        id
        email
        first_name
        second_name
        last_name
        avatar
      }
    }
  }
`;
