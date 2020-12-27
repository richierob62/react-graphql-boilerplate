import React, { useState } from 'react';

import Layout from '../components/Layout';
import { useCurrentUserLazyQuery } from '../generated/apolloComponents';
import { useRouter } from 'next/router';

// TODO: implement state solution (context, reducers, _app.tsx to have access to react context)

// TODO: localstorage implementation
// https://medium.com/@tgknapp11/simple-next-js-authentication-method-3cd2ae2f339c
// https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
// https://www.aboutmonica.com/blog/server-side-rendering-react-hydration-best-practices

export default function ApolloStuff() {
  // queries
  const [currentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  const stringData = JSON.stringify(data, null, 2);
  return (
    <Layout title="Apollo Stuff">
      <pre style={{ border: '1px solid grey' }}>{stringData}</pre>

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
