import gql from "graphql-tag";
export const GET_TIMELINE = gql`
  query Timeline($user_id: Int) {
    timeline(user_id: $user_id) {
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
