import gql from 'graphql-tag';

export const resetPasswordMutation = gql`
  mutation ResetPassword($data: PasswordResetInput!) {
    resetPassword(data: $data)
  }
`;
