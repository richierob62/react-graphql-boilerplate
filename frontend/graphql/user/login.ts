import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        firstName
        lastName
        email
        confirmed
      }
      errors {
        name
        message
      }
    }
  }
`;
