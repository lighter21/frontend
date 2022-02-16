import gql from "graphql-tag";

export const UPLOAD_IMAGES = gql`
  mutation Image($id: ID!, $type: String!, $files: [Upload!]) {
    UploadImages(id: $id, type: $type, files: $files) {
      path
    }
  }
`;
