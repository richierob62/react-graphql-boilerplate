import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
} from '@apollo/client';

import React from 'react';
import { currentUserQuery } from './queries';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql',
  }),
});

const TestComp = () => {
  const { loading, error, data } = useQuery(currentUserQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>This is App</h1>
      <TestComp />
    </div>
  </ApolloProvider>
);

export default App;
