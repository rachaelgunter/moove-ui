import { gql } from '@apollo/client';

export const BUSINESS_VERTICAL_DICTIONARY = gql`
  query BusinessVerticals {
    businessVerticals {
      id
      name
    }
  }
`;
export const JOB_FUNCTION_DICTIONARY = gql`
  query JobFunctions {
    jobFunctions {
      id
      name
    }
  }
`;
