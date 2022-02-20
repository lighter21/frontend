import gql from "graphql-tag";

export const ATTACH_POST_TO_GROUP = gql`
  mutation GroupPost($input: CreateGroupPostInput!) {
    attachPostToGroup(input: $input) {
      group_id
      post_id
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation Group($input: CreateGroupInput) {
    createGroup(input: $input) {
      id
      name
      description
    }
  }
`;

export const TOGGLE_MEMBERSHIP = gql`
  mutation GroupMember($user_id: ID!, $group_id: ID!) {
    ToggleMembership(user_id: $user_id, group_id: $group_id) {
      id
      name
    }
  }
`;
