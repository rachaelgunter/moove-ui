import { gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserPayload: CreateUserPayload!) {
    createUser(createUserPayload: $createUserPayload) {
      sub
      name
      picture
      createdAt
      roles
      email
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserPayload: DeleteUserPayload!) {
    deleteUser(deleteUserPayload: $deleteUserPayload) {
      email
    }
  }
`;

export default CREATE_USER_MUTATION;
