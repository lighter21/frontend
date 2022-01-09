import gql from "graphql-tag";
export const GET_GROUPS = gql`
  query Groups {
    groups {
      id
      name
      description
      privacy
      created_at
    }
  }
`;
