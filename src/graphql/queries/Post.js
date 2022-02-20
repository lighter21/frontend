import gql from "graphql-tag";
export const GET_TIMELINE = gql`
  query Timeline($user_id: Int) {
    Timeline(user_id: $user_id) {
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
        }
      }
      user {
        id
        username
        first_name
        second_name
        last_name
        avatar
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
