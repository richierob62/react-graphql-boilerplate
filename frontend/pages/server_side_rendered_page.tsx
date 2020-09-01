import * as React from 'react';

import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';

// If you don’t need to pre-render the data, then you should consider fetching data on the client side.

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, res, params } = context;

  console.log(req || res || params);

  return {
    props: {
      number: Math.floor(Math.random() * 1234567),
      query,
    },
  };
};

export default ({ number, query }: any) => (
  <Layout title={'ssr page'}>
    <br />
    <br />
    <br />
    <div>number: {number}</div>
    <div>query: {JSON.stringify(query, null, 2)}</div>
  </Layout>
);
