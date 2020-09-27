import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react';

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Next/TypeScript">
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
