import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const currentUserQuery = gql`
  query {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`;

export const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($data: EmailInput!) {
    forgotPassword(data: $data)
  }
`;

export const resetPasswordMutation = gql`
  mutation ResetPassword($data: PasswordResetInput!) {
    resetPassword(data: $data)
  }
`;

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;
