import React, { useState } from 'react';
import {
  useCurrentUserLazyQuery,
  useLoginMutation,
  useLogoutMutation,
} from '../generated/apolloComponents';

import Layout from '../components/Layout';
import Link from 'next/link';

const IndexPage: React.FunctionComponent = () => {
  const [val, setVal] = useState('');

  const [login, { loading }] = useLoginMutation();
  const [logout, { loading: loading_2 }] = useLogoutMutation();
  const [currentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  const waiting = loading || loading_2;

  const stringData = JSON.stringify(data, null, 2);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <p>{waiting ? 'Loading...' : 'All Done'}</p>

      <pre style={{ border: '1px solid grey' }}>{val}</pre>

      <pre style={{ border: '1px solid grey' }}>{stringData}</pre>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <button
        onClick={async () => {
          const response = await login({
            variables: {
              data: { email: 'foo11@example.com', password: '1234567' },
            },
          });
          if (response?.data?.login) {
            setVal(JSON.stringify(response, null, 2));
          }
        }}
      >
        call login mutation
      </button>

      <button
        onClick={async () => {
          const response = await logout({});
          if (response?.data?.logout) {
            setVal(JSON.stringify(response, null, 2));
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
        current user
      </button>
    </Layout>
  );
};

export default IndexPage;
