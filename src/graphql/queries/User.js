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
        created_at
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

export const GET_USERS_LIST = gql`
  query User {
    users {
      id
      email
      username
      first_name
      second_name
      last_name
      birth_date
      created_at
    }
  }
`;

export const GET_USER_FRIENDS = gql`
  query User($username: String) {
    user(username: $username) {
      id
      friends {
        id
        email
        username
        first_name
        second_name
        last_name
        birth_date
      }
    }
  }
`;

export const GET_USER_SUGGESTED_FRIENDS = gql`
  query User($user_id: ID!) {
    suggestedFriends(user_id: $user_id) {
      id
      email
      username
      first_name
      second_name
      last_name
      birth_date
    }
  }
`;
