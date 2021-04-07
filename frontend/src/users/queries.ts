import { gql } from '@apollo/client';

const USERS_QUERY = gql`
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

export default USERS_QUERY;
