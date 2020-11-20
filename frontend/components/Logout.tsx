import React from 'react';
import { useLogoutMutation } from '../generated/apolloComponents';
import { useRouter } from 'next/router';

export const Logout = () => {
  const router = useRouter();

  const [logout] = useLogoutMutation({
    onCompleted: () => router.push('/login'),
  });

  return (
    <button
      onClick={async () => {
        await logout({});
      }}
    >
      logout
    </button>
  );
};
