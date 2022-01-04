import gql from "graphql-tag";
export const GET_USER = gql`
  query User($username: String) {
    user(username: $username) {
      id
      email
      username
      first_name
      second_name
      last_name
      birth_date
      created_at
      posts {
        id
        body
        user {
          id
          email
          first_name
          second_name
          last_name
        }
        comments {
          id
          body
          user {
            id
            email
            first_name
            second_name
            last_name
          }
        }
      }
    }
  }
`;
