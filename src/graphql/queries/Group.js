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
            username
            first_name
            second_name
            last_name
            avatar
            parsed_avatar_path
          }
        }
        user {
          id
          email
          first_name
          second_name
          last_name
          avatar
          parsed_avatar_path
        }
        likes {
          id
        }
        image {
          parsed_path
        }
      }
      members {
        id
      }
    }
  }
`;
