import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      body
      created_at
      comments {
        id
        body
        created_at
        user {
          id
          email
          first_name
          second_name
          last_name
        }
      }
      user {
        id
        email
        first_name
        second_name
        last_name
      }
    }
  }
`;
