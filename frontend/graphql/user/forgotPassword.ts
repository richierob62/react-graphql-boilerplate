import gql from 'graphql-tag';

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($data: EmailInput!) {
    forgotPassword(data: $data)
  }
`;
