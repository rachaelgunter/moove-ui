import { gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserPayload: CreateUserPayload!) {
    createUser(createUserPayload: $createUserPayload) {
      sub
      name
      picture
      createdAt
      roles
    }
  }
`;

export default CREATE_USER_MUTATION;
