import * as React from 'react';

import Layout from '../components/Layout';

export async function getServerSideProps({ query }: any) {
  return {
    props: {
      number: Math.floor(Math.random() * 1234567),
      query,
    },
  };
}

export default ({ number, query }: any) => (
  <Layout title={'ssr page'}>
    <br />
    <br />
    <br />
    <div>number: {number}</div>
    <div>query: {JSON.stringify(query, null, 2)}</div>
  </Layout>
);
