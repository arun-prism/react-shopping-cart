import { gql } from "@apollo/client";

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
      # Include any other relevant fields
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $dob: AWSDate!) {
    createUser(input: { name: $name, email: $email, dob: $dob }) {
      id
      name
      email
      dob
    }
  }
`;
