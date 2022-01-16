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
export const GET_GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      name
      description
      privacy
      created_at
      posts {
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
  }
`;
