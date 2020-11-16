import React, { useState } from 'react';
import {
  useCurrentUserLazyQuery,
  useLogoutMutation,
} from '../generated/apolloComponents';

import Layout from '../components/Layout';
import { useRouter } from 'next/router'

export default function ApolloStuff() {

  const router = useRouter();

  const [val, setVal] = useState('');

  // mutations
  const [logout] = useLogoutMutation({
    onCompleted: () => router.push('/login'),
    });

  // queries
  const [currentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  const stringData = JSON.stringify(data, null, 2);
  return (
    <Layout title="Apollo Stuff">

      <pre style={{ border: '1px solid grey' }}>{val}</pre>

      <pre style={{ border: '1px solid grey' }}>{stringData}</pre>

      <button
        onClick={async () => {
          try {
            const response = await logout({});
            if (response?.data?.logout) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        logout
      </button>

      <button
        onClick={() => {
          currentUser({});
        }}
      >
        current user (lazy query)
      </button>

    </Layout>
  );
}
