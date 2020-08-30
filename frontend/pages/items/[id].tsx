import * as React from 'react';

import Layout from '../../components/Layout';

const StaticRoutePage: React.FunctionComponent = ({ itemData }: any) => {
  if (!itemData) return null;

  return (
    <Layout title="Static Page - Dynamic Route">
      <h2>{itemData.name}</h2>
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

export function getStaticPaths() {
  const paths = staticItemsList.map((i) => ({ params: { id: `${i.id}` } }));
  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }: { params: { id: string } }) {
  const itemData = staticItemsList.filter(
    (i) => i.id === parseInt(params.id)
  )[0];
  return {
    props: {
      itemData,
    },
  };
}

export default StaticRoutePage;
