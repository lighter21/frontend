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
