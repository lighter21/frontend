import gql from "graphql-tag";
import { ApiService } from "@/api/api.service";

// eslint-disable-next-line no-unused-vars
export const uploadImage = (id, model, file) => {
  return ApiService.graphqlUploadQuery(
    "graphql",
    gql`
      mutation Image($id: ID!, $type: String!, $file: Upload!) {
        UploadImage(id: $id, type: $type, file: $file) {
          path
        }
      }
    `,
    {
      id: id,
      type: model,
      file: null,
    },
    file
  );
};
