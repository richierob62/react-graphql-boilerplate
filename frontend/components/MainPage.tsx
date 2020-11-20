import React from 'react';
import { useCurrentUserQuery } from '../generated/apolloComponents';

const MainPage = () => {
  // queries
  const { data, loading } = useCurrentUserQuery({
    variables: {},
    fetchPolicy: 'network-only',
  });

  if (loading) return <h1>Loading...</h1>;

  const stringData = JSON.stringify(data, null, 2);
  return <pre style={{ border: '1px solid grey' }}>{stringData}</pre>;
};

export default MainPage;
