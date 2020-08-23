import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';

import fetch from 'isomorphic-unfetch';
import { isBrowser } from './isBrowser';
import { setContext } from '@apollo/link-context';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

const create = (initialState: any, { getToken }: Options) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `rid=${token}` : '',
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

const initApollo = (initialState: any, options: Options) => {
  // create new client if on server
  if (!isBrowser) {
    return create(initialState, options);
  }

  // reuse client on the client-side
  apolloClient = apolloClient || create(initialState, options);

  return apolloClient;
};

export default initApollo;
