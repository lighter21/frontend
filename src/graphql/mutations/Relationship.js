import gql from "graphql-tag";

export const CREATE_RELATIONSHIP = gql`
  mutation Relationship($input: CreateRelationshipInput!) {
    createRelationship(input: $input) {
      id
      user_first_id
      user_second_id
      type
      status
      created_at
      updated_at
    }
  }
`;
