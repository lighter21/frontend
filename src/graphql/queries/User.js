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
      avatar
      posts {
        id
        body
        created_at
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
            avatar
          }
        }
        image {
          parsed_path
        }
      }
    }
  }
`;

export const GET_USER_GENERAL_DATA = gql`
  query User($username: String) {
    user(username: $username) {
      email
      first_name
      second_name
      last_name
      birth_date
      avatar
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
        avatar
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
      avatar
    }
  }
`;

export const GET_USERS_FRIENDS_LIST = gql`
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
        avatar
      }
    }
  }
`;
