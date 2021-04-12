import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query users($offset: Int!, $limit: Int!) {
    users(offset: $offset, limit: $limit) {
      totalCount
      nodes {
        name
        email
        picture
        lastLogin
        createdAt
        roles
        sub
      }
    }
  }
`;

export const ORGANIZATIONS_QUERY = gql`
  query organizations {
    organizations {
      id
      name
    }
  }
`;
