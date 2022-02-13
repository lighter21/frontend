import gql from "graphql-tag";

export const UPDATE_OR_CREATE_FRIEND = gql`
  mutation User($id: ID!, $friend_id: ID!, $status: String!) {
    UpdateOrCreateFriend(id: $id, friend_id: $friend_id, status: $status) {
      id
      first_name
      last_name
    }
  }
`;

export const UPDATE_USER_GENERAL_DATA = gql`
  mutation User($id: ID!, $input: UpdateUserGeneralDataInput!) {
    updateUserGeneralData(id: $id, input: $input) {
      id
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation User($input: ChangePasswordInput!) {
    ChangeUserPassword(input: $input) {
      id
    }
  }
`;
