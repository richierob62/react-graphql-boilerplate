import gql from 'graphql-tag';

export const confirmEmailMutation = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token)
  }
`;
