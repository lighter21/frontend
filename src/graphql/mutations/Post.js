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

export const TOGGLE_LIKE = gql`
  mutation Like($post_id: ID!, $user_id: ID!) {
    ToggleLike(post_id: $post_id, user_id: $user_id) {
      id
    }
  }
`;
