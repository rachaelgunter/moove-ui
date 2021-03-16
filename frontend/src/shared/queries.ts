import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    getCurrentUser {
      name
      sub
      organization
      email
      picture
      role
    }
  }
`;
