import gql from "graphql-tag";

export const UPDATE_FRIEND_REQUEST = gql`
  mutation User($id: ID!, $friend_id: ID!, $status: String!) {
    UpdateFriendRequest(id: $id, friend_id: $friend_id, status: $status) {
      id
      first_name
      last_name
    }
  }
`;
