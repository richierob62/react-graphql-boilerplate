////////////  FRAGMENTS  ////////////////
/////////////////////////////////////////

// Posts
export const allPostsQuery = `

fragment userInfo on User {
  id
  firstName
  lastName
  email
}

fragment voteInfo on Vote {
  id
  ...userInfo
}

fragment commentInfo on Comment {
  id
  body
  ...userInfo
  votes {
    ..voteInfo
  }
}

query {
  post {
    id
    title
    body
    ...userInfo
    comments {
      ...commentInfo
    }
    votes {
      ...voteInfo
    }
}
`;

export const allPostsForUserQuery = `

fragment userInfo on User {
  id
  firstName
  lastName
  email
}

fragment voteInfo on Vote {
  id
  ...userInfo
}

fragment commentInfo on Comment {
  id
  body
  ...userInfo
  votes {
    ..voteInfo
  }
}

query allPostsForUser($userId: Number!) {
  post {
    id
    title
    body
    ...userInfo
    comments {
      ...commentInfo
    }
    votes {
      ...voteInfo
    }
}
`;

export const createPostMutation = `

fragment userInfo on User {
  id
  firstName
  lastName
  email
}

mutation createPost($data: PostInput!) {
  createPost(data: $data) {
    post {
      id
      title
      body
      user {
        ...userInfo
      }
  }
}
`;

// Comments
export const allCommentsForPostQuery = `
query commentsForPost($postId: Number!) {
  comment{
    id
    body
    post
    user {
      id
      firstName
      lastName
      email
    }
    votes {
...voteInfo
    }
  }
}
`;


export const loginMutation = `
mutation login($data: LoginInput!) {
  login(data: $data) {
    id
    email
    firstName
    lastName
  }
}
`;

export const currentUserQuery = `
query {
  currentUser{
    id
    email
    firstName
    lastName
  }
}
`;

export const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    email
    firstName
    lastName
  }
}
`;

export const forgotPasswordMutation = `
mutation ForgotPassword($data: EmailInput!) {
  forgotPassword(data: $data) 
}
`;

export const resetPasswordMutation = `
mutation ResetPassword($data: PasswordResetInput!) {
  resetPassword(data: $data) 
}
`;

export const logoutMutation = `
mutation Logout {
  logout
}
`;
