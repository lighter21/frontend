import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      body
      created_at
      comments {
        body
        user {
          id
          email
          first_name
          second_name
          last_name
          avatar
          parsed_avatar_path
        }
      }
      user {
        id
        username
        first_name
        second_name
        last_name
        avatar
        parsed_avatar_path
      }
      likes {
        id
      }
      image {
        parsed_path
      }
      groups {
        id
        name
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
