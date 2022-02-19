import gql from "graphql-tag";
export const GET_IMAGES_GALLERY = gql`
  query Timeline($username: String!) {
    ImagesGallery(username: $username) {
      imageable_id
      parsed_path
    }
  }
`;
