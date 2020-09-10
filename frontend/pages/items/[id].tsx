import * as React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const StaticRoutePage: React.FunctionComponent = ({ itemData }: any) => {
  const router = useRouter();

  // This should not be necessary
  if ((router && router.isFallback) || !itemData) {
    return <div>Loading...</div>;
  }

  // pages/post/[pid].js => /post/abc?foo=bar => router.query => { "foo": "bar", "pid": "abc" }

  // pages/post/[...slug].js => /post/a, but also /post/a/b, /post/a/b/c => { "slug": ["a", "b", "c"] }

  // pages/post/[[...slug]].js => /post plus above

  // router.push('/about')

  // router.push('/?counter=10', undefined, { shallow: true }) => page doesn't change, no data fetching

  return (
    <Layout title="Static Page - Dynamic Route">
      <h2>{`${router.asPath} => ${itemData.name} `}</h2>
    </Layout>
  );
};

const staticItemsList = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
];

export const getStaticPaths: GetStaticPaths = async () => {
  // pre-rendering only pages 1 and 2
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params }: any = context;

  const itemData = staticItemsList.filter(
    (i) => i.id === parseInt(params.id)
  )[0];
  return {
    props: {
      itemData,
    },
  };
};

export default StaticRoutePage;
