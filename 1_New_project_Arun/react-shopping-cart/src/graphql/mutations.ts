import { gql } from "@apollo/client";

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
      # Include any other relevant fields
    }
  }
`;
